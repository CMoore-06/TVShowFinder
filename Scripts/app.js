//Declare Variables
const select = document.getElementById("show-select");
const detailsSection = document.getElementById("show-details");
const textSection = document.getElementById("text");
const message = document.getElementById("messages");

//Add Event Listeners + Call Functions
getShows();
select.onchange = () => {
    let id = select.value;
    if(id === "") {
        return;
    }
    else {
        message.textContent = "";
        loadDetails(id);
    }
}

//Functions
async function getShows() {
    message.textContent = "Loading shows..."

    const url = "https://api.tvmaze.com/shows?page=0";
    try {
        const result = await fetch(url);

        if(!result.ok) {
            if(result.status === 404)
            {
                message.textContent = `Error 404. The requested show could not be found.`
            }
            else {
                message.textContent = `Loading details failed. Status ${result.status}`;
            }
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
    message.textContent = "";
}

async function loadDetails(id) {
    message.textContent = "Loading show details...";

    let newUrl = `https://api.tvmaze.com/shows/${id}`

    try {
        let result2 = await fetch(newUrl);
        if(!result2.ok) {
            if(result2.status === 404)
            {
                message.textContent = `Error 404. The requested show could not be found.`
            }
            else {
                message.textContent = `Loading details failed. Status ${result2.status}`;
            }
        }

        else {
            let details = await result2.json();
            showDetails(details);
        }
    }

    catch(error) {
        message.textContent = error;
    }
}

function showDetails(result) {
    detailsSection.replaceChildren();

    let h2 = document.createElement("h2");
    h2.textContent = result.name ?? "Unknown.";

    let poster = document.createElement("img");
    if(!result.image) {
        document.createElement("p").textContent = "No image provided.";
    }

    else {
        poster.src = result.image?.original ?? "";
        poster.alt = `The poster image for ${result.name}`;
    }

    let genreList = document.createElement("p");
    genreList.textContent = `Genres: ${result.genres.join(", ")}` ?? "No genres listed.";

    let summary = document.createElement("p");
    summary.innerHTML = result.summary ?? "No summary provided.";

    let premiereDate = document.createElement("p");
    premiereDate.textContent = `Premier Date: ${result.premiered}` ?? "No date provided.";

    let status = document.createElement("p");
    status.textContent = `Show Status: ${result.status}` ?? "Unknown";

    let rating = document.createElement("p");
    rating.textContent = `Average rating: ${result.rating.average}` ?? "Unknown.";

    let content = document.createElement("div");
    content.id = "content";

    let text = document.createElement("div");
    text.id = "text";

    content.append(poster, text);
    text.append(h2, genreList, summary, premiereDate, status, rating);
    detailsSection.append(content, text);

    message.textContent = "";
}