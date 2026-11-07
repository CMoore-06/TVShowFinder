//Declare Variables
const select = document.getElementById("show-select");

//Add Event Listeners + Call Functions
getShows();

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