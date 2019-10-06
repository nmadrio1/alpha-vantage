/**
 * Simple weather display application for demonstrating AJAX for JSON and
 * best practices for JavaScript development.  The script makes use of the
 * OpenWeatherMap weather API.
 */
(() => {
    const API_KEY = 'YU2GONXBXQR363KB';
    const ENDPOINT = 'https://www.alphavantage.co/';

    
    /**
     * Displays the current weather for a given location.
     * @param {Object} data - The object of returned weather data.
     * @param {Object} el - The reference to the display DOM element.
     */
    const displayWeather = (data, el) => {
        // DOM insertion points
        let symbol = el.querySelector('.details>.symbol'),
          //  date = el.querySelector('.details>.currentDate'),
            volume = el.querySelector('.details>.volume'),
            price = el.querySelector('.details>.price'),
           // change = el.querySelector('.details>.change'),
           // changePercent = el.querySelector('.details>.change-percent'),
           // previous = el.querySelector('.details>.previous'),
           // open = el.querySelector('.details>.open'),
           // high = el.querySelector('.details>.high'),
            //low = el.querySelector('.details>.low');

            timeReset = el.querySelector('.details>.timereset');

            newData = el.querySelector('.details>.newdata');

            // sunrise = el.querySelector('.details>.sunrise'),
            // sunset = el.querySelector('.details>.sunset'),
            // forecast = el.querySelector('.forecast');

        // display the current weather data
        symbol.innerText = data["Meta Data"]["2. Symbol"];
        //date.innerText = data["Meta Data"]["07. latest trading day"];
        volume.innerText = data["Meta Data"]["3. Last Refreshed"];
        price.innerText = data["Meta Data"]["4. Output Size"];
        //change.innerText = data["Meta Data"]["09. change"];
       // previous.innerText = data["Meta Data"]["08. previous close"];        
        //changePercent.innerText = data["Meta Data"]["10. change percent"];
       // open.innerText = data["Meta Data"]["02. open"];
       // high.innerText = data["Meta Data"]["03. high"];
        //low.innerText = data["Meta Data"]["04. low"];

        timeReset.innerText = data["Meta Data"]["04. low"];
       
        newData.innerText = data["Time Series (Daily)"]["1. open"];



        // sunrise.innerText = new Date(+ data.sys.sunrise * 1000);
        // sunset.innerText = new Date(+ data.sys.sunset * 1000);
    }

    // Event listener for retrieving a weather forecast
    document
        .querySelector('.frm.stocks')
        .addEventListener('submit', function (e) {
            let symbol = e
                .target
                .querySelector('[name=symbol]')
                .value;

            // fetch the weather data
           fetch(`${ENDPOINT}query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`).then(data =>{
            // fetch(`${ENDPOINT}weather?q=${location}&units=metric&appid=${API_KEY}`).then(data => {
                return data.json()
            }).then(json => {
                displayWeather(json, document.querySelector('.stock-display'));
                // now fetch the forecast data
                return fetch(`${ENDPOINT}query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
            }).then(data => {
                return data.json()
            });//.then(json => {
            //     displayForecast(json.list, document.querySelector('.stock-display > .forecast'));
            // });

            e.preventDefault();
        });
})();