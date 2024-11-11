let fetchURL = "";
let toggle = false; //boolean to check if details and by hour are hidden or not
const form = document.querySelector("form");
const inputLocation = document.querySelector("input[name='location']");
const sectionWeatherDay = document.querySelector("#weatherByDay");
const sectionWeatherDetails = document.querySelector("#weatherDetails");
const sectionWeatherHour = document.querySelector("#weatherByHour");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    removeElements([sectionWeatherDay, sectionWeatherDetails, sectionWeatherHour]);

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
        //console.log(jsonData);
        showData(jsonData);
    } else {
        alert(`The City is unknown. \nEnter a valid city for weather information. \nFor example Leuven.`);
    }
}

function getDayName(day) {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return day;
    }
}

function showData(jsonData) {
    let dataIndex = 0;

    for(let i=0; i<7; i++) {
        const container = document.createElement("div");
        container.setAttribute("data-index", i);
        const date = document.createElement("p");
        const temp = document.createElement("p");
        const conditions = document.createElement("p");
        const minTemp = document.createElement("p");
        const maxTemp = document.createElement("p");
        const containerMinMaxTemp = document.createElement("div");

        //show the details and data by hour on website by clicking on the datum of a day
        container.addEventListener("click", () => {
            if(! container.hasAttribute("data-toggle")) {
                if (toggle) {
                    removeElements([sectionWeatherDetails, sectionWeatherHour]);
                    document.querySelector(`[data-index="${dataIndex}"]`).toggleAttribute("data-toggle");
                    toggle = false;
                }
                showDetails(i, jsonData);
                showByHour(i, jsonData);
                toggle = true;
                dataIndex = container.getAttribute("data-index");
                container.toggleAttribute("data-toggle");
            } else {
                removeElements([sectionWeatherDetails, sectionWeatherHour]);
                toggle = false;
                container.toggleAttribute("data-toggle");
            }
        });
         
        let data = jsonData.days[i];
        let dayOfTheWeek = new Date(data.datetime);

        date.innerText = getDayName(dayOfTheWeek.getDay()) + "\n" + data.datetime;
        temp.innerText = data.temp + " °C";
        conditions.innerText = data.conditions;
        minTemp.innerText = "Min\n" + data.tempmin + " °C";
        maxTemp.innerText = "Max\n" + data.tempmax + " °C";

        containerMinMaxTemp.appendChild(minTemp);
        containerMinMaxTemp.appendChild(maxTemp);
        container.appendChild(date);
        container.appendChild(temp);
        container.appendChild(conditions);
        container.appendChild(containerMinMaxTemp);
        sectionWeatherDay.appendChild(container);
    }
}

function showDetails(index, jsonData) {
    const container = document.createElement("div");
    const date = document.createElement("h2");
    const description = document.createElement("p");
    const subcontainer = document.createElement("div");
    const details = document.createElement("div");
    const detailsText = document.createElement("p");
    const warnings = document.createElement("div");
    const warningsText = document.createElement("p");

    let data = jsonData.days[index];
    let dayOfTheWeek = new Date(data.datetime);

    date.innerText = getDayName(dayOfTheWeek.getDay()) + " " + data.datetime;
    description.innerText = data.description;
    detailsText.innerText = `Details:\n 
        Sunrise: ${data.sunrise}\n
        Sunset: ${data.sunset}\n
        Windspeed: ${data.windspeed}`;
    warningsText.innerText = `Warnings:\n 
        UV Index: ${data.uvindex}\n
        Visibility: ${data.visibility}\n
        Snow: ${data.snow}`;

    details.appendChild(detailsText);
    warnings.appendChild(warningsText);

    subcontainer.appendChild(details);
    subcontainer.appendChild(warnings);

    container.appendChild(date);
    container.appendChild(description);
    container.appendChild(subcontainer);
    sectionWeatherDetails.appendChild(container);
}

function showByHour(index, jsonData) {
    for(let i=0; i<7; i++) {
        const container = document.createElement("div");
        const hour = document.createElement("p");
        const conditions = document.createElement("p");
        const temp = document.createElement("p");

        let data = jsonData.days[index].hours[i];
        
        hour.innerText = data.datetime;
        conditions.innerText = data.conditions;
        temp.innerText = data.temp + " °C";

        container.appendChild(hour);
        container.appendChild(conditions);
        container.appendChild(temp);
        sectionWeatherHour.appendChild(container);
    }
}

//function for removing DOM elements by taking array of elements
function removeElements(elements) {
    for (let element of elements) {
        while(element.firstChild) {
            element.firstChild.remove();
        }
    }
}