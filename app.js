// console.log("start");

window.addEventListener("load", () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');

    // console.log("loaded");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/0ee7e1f4b8086e05b69e8791e887d49c/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;

                    // set DOM elements from the api
                    setDOM(temperature, summary, data);

                    // FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * 5 / 9;

                    // set icon
                    setIcon(icon, document.querySelector('.icon'));

                    // change temperature to C/F
                    addTemperatureClickEvent(celsius, temperature);
                })
        });
    }
    
    // set DOM elements from the api
    function setDOM(temperature, summary, data) {
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function addTemperatureClickEvent(celsius, temperature) {
        temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === 'F') {
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius);
            } else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;
            }
        });
    }
});