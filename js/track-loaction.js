const email = document.getElementById("email");
const aadhaar = document.getElementById("aadhaar");

const verifyButton = document.getElementById("verifyButton");

const authentication = document.getElementById("authentication");
const mapSection = document.getElementById("mapSection");

const error = document.getElementById("error");

const latitudeElement = document.getElementById("latitude");
const longitudeElement = document.getElementById("longitude");

const locationMap = document.getElementById("locationMap");


verifyButton.addEventListener("click", function () {

    error.textContent = "";

    if (email.value === "" || aadhaar.value === "") {
        error.textContent = "Please enter Email and Aadhaar number.";
        return;
    }

    // Dummy authentication
    authentication.style.display = "none";
    mapSection.style.display = "block";


    // Dummy location
    const latitude = 26.4499;
    const longitude = 80.3319;


    // Show coordinates
    latitudeElement.textContent = latitude;
    longitudeElement.textContent = longitude;


    // Show location on map
    locationMap.src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.02},${latitude - 0.02},${longitude + 0.02},${latitude + 0.02}&layer=mapnik&marker=${latitude},${longitude}`;

});