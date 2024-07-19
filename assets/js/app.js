let fetchURL = "";
let body = document.querySelector("body");
let span = document.createElement("span");
let span2 = document.createElement("span");

function setLocation(location) {
    fetchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}?unitGroup=metric&key=KA52FBCELJKYANAYNJGU89WD9&contentType=json`;
}

async function showData() {
    let response = await fetch(fetchURL);

    if(response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        console.log(jsonData.description);
        span.innerText = jsonData.resolvedAddress + "\n";
        span2.innerText = jsonData.currentConditions.temp + " °C";
        body.appendChild(span);
        body.appendChild(span2);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

setLocation("Tokyo");
showData();