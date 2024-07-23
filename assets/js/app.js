let fetchURL = "";
let form = document.querySelector("form");
let inputLocation = document.querySelector("input[name='location']");
let sectionWeatherDay = document.querySelector("#weatherByDay");
let sectionWeatherDetails = document.querySelector("#weatherDetails");
let sectionWeatherHour = document.querySelector("#weatherByHour");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let locationValue = inputLocation.value;
    setLocation(locationValue);
    showData();
})

function setLocation(location) {
    fetchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}?unitGroup=metric&key=KA52FBCELJKYANAYNJGU89WD9&contentType=json`;
}

async function showData() {
    let response = await fetch(fetchURL);

    if(response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);

        let div = document.createElement("div");
        let address = document.createElement("span")
        let temp = document.createElement("span")

        address.innerText = jsonData.resolvedAddress + "\n";
        temp.innerText = jsonData.currentConditions.temp + " °C";

        div.appendChild(address);
        div.appendChild(temp);
        sectionWeatherDay.appendChild(div);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}