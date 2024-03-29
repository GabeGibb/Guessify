package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"golang.org/x/oauth2"
)

var conf = &oauth2.Config{}

func setupConfig() {
	godotenv.Load()
	conf = &oauth2.Config{
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		RedirectURL:  os.Getenv("REDIRECT_URL"),
		Scopes:       []string{"user-read-private", "user-read-email", "user-top-read", "user-library-read"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://accounts.spotify.com/authorize",
			TokenURL: "https://accounts.spotify.com/api/token",
		},
	}

}

func main() {
	setupConfig()
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowCredentials: true,
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, "Token"},
	}))

	e.GET("/", hello)
	e.GET("/login", login)
	e.GET("/callback", callback)
	e.GET("/verify-user", verifyUser)

	e.GET("/top-songs", getTopSongs)
	e.GET("/top-artists", getArtists)
	e.GET("/artist", getArtist)
	e.GET("/search-artist", searchArtist)
	e.GET("/top-playlists", getPlaylists)
	e.GET("/artist-albums", getArtistAlbums)
	e.GET("/multiple-artist-albums", getMultipleArtistAlbums)
	e.GET("/playlist-songs", getPlayistSongs)
	e.GET("/playlist", getPlaylist)

	e.Logger.Fatal(e.Start(os.Getenv("HOST") + ":1323"))
}

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func getSpotify(c echo.Context, url string) error {
	token := c.Request().Header.Get("Token")
	if token == "" {
		return c.String(http.StatusBadRequest, "Token is missing")
	}

	// Create a new request
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to create request: %s", err.Error()))
	}

	// Add the Authorization header to the request
	req.Header.Add("Authorization", "Bearer "+token)

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to send request: %s", err.Error()))
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		return c.String(resp.StatusCode, "Spotify API returned an error")
	}

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to read response body: %s", err.Error()))
	}

	// Parse the JSON response
	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to parse JSON response: %s", err.Error()))
	}

	return c.JSON(http.StatusOK, result)
}

func verifyUser(c echo.Context) error {
	url := "https://api.spotify.com/v1/me"
	return getSpotify(c, url)
}

func login(c echo.Context) error {
	url := conf.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func callback(c echo.Context) error {
	code := c.QueryParam("code")
	token, err := conf.Exchange(context.Background(), code)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to exchange token: %s", err.Error()))
	}

	return c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONTEND_URL")+"/home?token="+token.AccessToken)
}

func getTopSongs(c echo.Context) error {
	offset := c.QueryParam("offset")
	timeRange := c.QueryParam("time_range")
	if timeRange == "" {
		timeRange = "medium_term"
	}

	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/tracks?time_range=%s&limit=49&offset=%s", timeRange, offset)
	return getSpotify(c, url)
}

func getArtists(c echo.Context) error {
	url := "https://api.spotify.com/v1/me/top/artists?limit=10"
	return getSpotify(c, url)
}

func getArtist(c echo.Context) error {
	artistID := c.QueryParam("id")
	url := fmt.Sprintf("https://api.spotify.com/v1/artists/%s", artistID)
	return getSpotify(c, url)
}

func searchArtist(c echo.Context) error {
	artistName := c.QueryParam("name")
	artistName = strings.ReplaceAll(artistName, " ", "%20") // Replace spaces with %20
	url := fmt.Sprintf("https://api.spotify.com/v1/search?q=%s&type=artist", artistName)
	return getSpotify(c, url)
}

func getPlaylists(c echo.Context) error {
	url := "https://api.spotify.com/v1/me/playlists?limit=10"
	return getSpotify(c, url)
}

func getArtistAlbums(c echo.Context) error {
	artistID := c.QueryParam("id")
	url := fmt.Sprintf("https://api.spotify.com/v1/artists/%s/albums?include_groups=album,single", artistID)

	return getSpotify(c, url)
}

func getMultipleArtistAlbums(c echo.Context) error {
	artistIDs := c.QueryParam("id")
	url := fmt.Sprintf("https://api.spotify.com/v1/albums?ids=%s", artistIDs)
	return getSpotify(c, url)
}

func getPlayistSongs(c echo.Context) error {
	playlistID := c.QueryParam("id")
	offset := c.QueryParam("offset")

	url := fmt.Sprintf("https://api.spotify.com/v1/playlists/%s/tracks?limit=100&offset=%s", playlistID, offset)
	return getSpotify(c, url)
}

func getPlaylist(c echo.Context) error {
	playlistID := c.QueryParam("id")
	url := fmt.Sprintf("https://api.spotify.com/v1/playlists/%s", playlistID)
	return getSpotify(c, url)
}
