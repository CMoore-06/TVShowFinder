//Declare Variables
const select = document.getElementById("show-select");

//Add Event Listeners + Call Functions
populateDropdown();

//Functions
async function populateDropdown() {
    const url = "https://api.tvmaze.com/shows?page=0";
    try {
        const result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Request failed. Status: ${result.status}`);
        }

        const shows = await result.json();
        console.log(shows);
    }
    catch(error) {
        console.log(error);
    }
}