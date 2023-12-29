package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/oauth2"
)

var (
	conf = &oauth2.Config{
		ClientID:     "fa88e2d1111a4e97bcd60671117fc068",
		ClientSecret: "7ebd8fe4811a49e4842b19e13e1ba391",
		RedirectURL:  "http://localhost:1323/callback",
		Scopes:       []string{"user-read-private", "user-read-email", "user-top-read", "user-library-read"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://accounts.spotify.com/authorize",
			TokenURL: "https://accounts.spotify.com/api/token",
		},
	}
	store = sessions.NewCookieStore([]byte("secret"))
)

func main() {
	e := echo.New()

	e.Use(session.Middleware(store))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowCredentials: true,
	}))

	e.GET("/", hello)
	e.GET("/login", login)
	e.GET("/callback", callback)
	e.GET("/token", token)
	e.GET("/top-songs", getTopSongs) // New endpoint to get top songs

	e.Logger.Fatal(e.Start("localhost:1323"))
}

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
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

	sess, err := session.Get("session", c)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to get session: %s", err.Error()))
	}

	sess.Values["token"] = token.AccessToken
	err = sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Failed to save session: %s", err.Error()))
	}

	return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/game")
}

func token(c echo.Context) error {
	sess, _ := session.Get("session", c)
	token := sess.Values["token"]

	return c.JSON(http.StatusOK, map[string]string{"access_token": token.(string)})
}

func getSpotify(c echo.Context, url string) error {
	sess, _ := session.Get("session", c)
	token := sess.Values["token"].(string)

	// Create a new request
	req, _ := http.NewRequest("GET", url, nil)

	// Add the Authorization header to the request
	req.Header.Add("Authorization", "Bearer "+token)

	// Send the request
	client := &http.Client{}
	resp, _ := client.Do(req)

	// Read the response body
	body, _ := ioutil.ReadAll(resp.Body)

	// Parse the JSON response
	var result map[string]interface{}
	json.Unmarshal(body, &result)

	return c.JSON(http.StatusOK, result)
}

func getTopSongs(c echo.Context) error {
	return getSpotify(c, "https://api.spotify.com/v1/me/tracks?limit=50")
}
