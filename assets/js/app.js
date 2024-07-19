let fetchURL = "";
let address = document.querySelector("#address");
let temp = document.querySelector("#temperature");

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
        address.innerText = jsonData.resolvedAddress + "\n";
        temp.innerText = jsonData.currentConditions.temp + " °C";
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

setLocation("Tokyo");
showData();