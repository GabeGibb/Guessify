import baseUrl from "../services/Url";

function MainPage() {
    
    return (
        <div>
            <a href={baseUrl+"login"}>LOGIN TO SPOTIFY</a>
        </div>
    );
}

export default MainPage;