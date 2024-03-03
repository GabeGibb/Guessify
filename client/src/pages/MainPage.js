import baseUrl from "../services/Url";

function MainPage() {
    return (
        <div className="m-auto w-fit mt-10">
            <button className='sm:m-auto text-2xl sm:text-xl bg-[var(--spotify-green)] px-10 py-5 sm:py-3 rounded-2xl custom-hover'>
                <a href={baseUrl+"login"}>LOGIN TO SPOTIFY</a>
            </button>
        </div>
    );
}

export default MainPage;