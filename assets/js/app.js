let fetchURL = "";
const form = document.querySelector("form");
const inputLocation = document.querySelector("input[name='location']");
const sectionWeatherDay = document.querySelector("#weatherByDay");
const sectionWeatherDetails = document.querySelector("#weatherDetails");
const sectionWeatherHour = document.querySelector("#weatherByHour");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let locationValue = inputLocation.value;
    setLocation(locationValue);
    fetchData();
})

function setLocation(location) {
    fetchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}?unitGroup=metric&key=KA52FBCELJKYANAYNJGU89WD9&contentType=json`;
}

async function fetchData() {
    let response = await fetch(fetchURL);

    if(response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        showData(jsonData);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

function showData(jsonData) {
    for(let i=0; i<7; i++) {
        const div = document.createElement("div");
        div.setAttribute("data-index-number", i);
        const date = document.createElement("p");
        date.addEventListener("click", () => {showDetails(i, jsonData)});
        const temp = document.createElement("p");
        const minTemp = document.createElement("p");
        const maxTemp = document.createElement("p");

        let data = jsonData.days[i];
        date.innerText = data.datetime;
        temp.innerText = data.temp + " °C";
        minTemp.innerText = "Min\n" + data.tempmin + " °C";
        maxTemp.innerText = "Max\n" + data.tempmax + " °C";

        div.appendChild(date);
        div.appendChild(temp);
        div.appendChild(minTemp);
        div.appendChild(maxTemp);
        sectionWeatherDay.appendChild(div);
    }
}

function showDetails(index, jsonData) {
    const div = document.createElement("div");
    const date = document.createElement("h2");
    const description = document.createElement("p");
    const details = document.createElement("div");
    const detailsText = document.createElement("p");
    const warnings = document.createElement("div");
    const warningsText = document.createElement("p");

    let data = jsonData.days[index];
    detailsText.innerText = `Sunrise: ${data.sunrise}\n
        Sunset: ${data.sunset}\n
        Windspeed: ${data.windspeed}`;
    warningsText.innerText = `UV Index: ${data.uvindex}\n
        Visibility: ${data.visibility}\n
        Snow: ${data.snow}`;

    details.appendChild(detailsText);
    warnings.appendChild(warningsText);

    description.innerText = data.description;
    date.innerText = data.datetime;

    div.appendChild(date);
    div.appendChild(description);
    div.appendChild(details);
    div.appendChild(warnings);
    sectionWeatherDetails.appendChild(div);
}