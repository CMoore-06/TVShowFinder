//Declare Variables
const select = document.getElementById("show-select");
const detailsSection = document.getElementById("show-details");

//Add Event Listeners + Call Functions
getShows();
select.onchange = () => {
    let id = select.value;
    if(id === "") {
        return;
    }
    else {
        loadDetails(id);
    }
}

//Functions
async function getShows() {
    const url = "https://api.tvmaze.com/shows?page=0";
    try {
        const result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Request failed. Status: ${result.status}`);
        }

        const Shows = await result.json();
        const shows = Shows.slice(0, 25);
        const sorted = shows.sort((a, b) => {a > b});
        fillDropdown(sorted);
    }
    catch(error) {
        console.log(error);
    }
}

function fillDropdown(shows) {
    select.replaceChildren();

    for(let i = 0; i < shows.length; i++) {
        let option = document.createElement("option");
        option.textContent = shows[i].name;
        option.value = shows[i].id;

        select.append(option);
    }
}

async function loadDetails(id) {
    let newUrl = `https://api.tvmaze.com/shows/${id}`

    try {
        let result2 = await fetch(newUrl);
        if(!result2.ok) {
            console.log(`Loading details failed. Call status: ${result2.status}`);
        }

        else {
            let details = await result2.json();
            showDetails(details);
        }
    }

    catch(error) {
        console.log(error);
    }
}

function showDetails(result) {
    detailsSection.replaceChildren();

    let h2 = document.createElement("h2");
    h2.textContent = result.name ?? "Unknown.";

    if(!result.image) {
        document.createElement("p").textContent = "No image provided.";
    }

    else {
        let poster = document.createElement("img");
        poster.src = result.image?.original ?? "";
        poster.alt = `The poster image for ${result.name}`;
    }

    let genreList = document.createElement("p");
    genreList.textContent = `Genres: ${result.genres.join(", ")}` ?? "No genres listed.";

    let summary = document.createElement("p");
    summary.innerHTML = result.summary ?? "No summary provided.";

    let premiereDate = document.createElement("p");
    premiereDate.textContent = result.premiered ?? "No date provided.";

    let status = document.createElement("p");
    status.textContent = result.status ?? "Unknown";

    let rating = document.createElement("p");
    rating.textContent = `Average rating: ${result.rating.average}` ?? "Unknown.";

    detailsSection.append(h2);
    detailsSection.append(poster);
    detailsSection.append(genreList);
    detailsSection.append(summary);
    detailsSection.append(premiereDate);
    detailsSection.append(status);
    detailsSection.append(rating);
}