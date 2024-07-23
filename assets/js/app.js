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

        for(let i=0; i<7; i++) {
            let div = document.createElement("div");
            let date = document.createElement("p")
            let temp = document.createElement("p")
            let minTemp = document.createElement("p")
            let maxTemp = document.createElement("p")

            date.innerText = jsonData.days[i].datetime;
            temp.innerText = jsonData.days[i].temp + " °C";
            minTemp.innerText = "Min\n" + jsonData.days[i].tempmin + " °C";
            maxTemp.innerText = "Max\n" + jsonData.days[i].tempmax + " °C";

            div.appendChild(date);
            div.appendChild(temp);
            div.appendChild(minTemp);
            div.appendChild(maxTemp);
            sectionWeatherDay.appendChild(div);
        }
    } else {
        alert("HTTP-Error: " + response.status);
    }
}