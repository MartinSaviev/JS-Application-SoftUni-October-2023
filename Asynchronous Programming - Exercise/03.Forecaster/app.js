function attachEvents() {

    const url = 'http://localhost:3030/jsonstore/forecaster';

    const inputText = document.getElementById('location');
    const getWeather = document.getElementById('submit');
    const divCurrent = document.getElementById('current');
    const divForecastId = document.getElementById('forecast');
    const divUpcoming = document.getElementById('upcoming');

    const weather = {

        Sunny: "☀",
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',
    }

    getWeather.addEventListener('click', onLoadWeather);

    const divForecast = document.createElement('div');
    const divForecastInfo = document.createElement('div');

    async function onLoadWeather() {

        try {

            divForecast.innerHTML = '';
            divForecastInfo.innerHTML = '';
            divForecast.className = 'forecasts';
            divCurrent.appendChild(divForecast);

            const res = await fetch(`${url}/locations`)
            const arrObjects = await res.json();
            let allTowns = [];

            for (const line of arrObjects) {

                if (line.name.toLowerCase() === inputText.value.toLowerCase()) {

                    allTowns.push(line.name);
                    const response = await fetch(`${url}/today/${line.code}`);
                    if (response.status !== 200) {
                        throw new Error;
                    }
                    const oneDayData = await response.json();

                    divForecastId.style.display = 'block';
                    divForecast.appendChild(createElements('span', 'condition symbol', weather[oneDayData.forecast.condition]));
                    const spanCondition = createElements('span', 'condition');
                    divForecast.appendChild(spanCondition);
                    spanCondition.appendChild(createElements('span', 'forecast-data', oneDayData.name));
                    spanCondition.appendChild(createElements('span', 'forecast-data', `${oneDayData.forecast.low}${weather.Degrees}/${oneDayData.forecast.high}${weather.Degrees}`));
                    spanCondition.appendChild(createElements('span', 'forecast-data', oneDayData.forecast.condition));

                }
                const resp = await fetch(`${url}/upcoming/${line.code}`);

                if (resp.status !== 200) {
                    throw new Error;
                }
                const threeDaysData = await resp.json();

                if (threeDaysData.name === inputText.value) {

                    const forecastArray = threeDaysData.forecast;

                    divForecastInfo.classList.add('forecast-info');
                    divUpcoming.appendChild(divForecastInfo);
                    for (const threeDaysData of forecastArray) {

                        const spanUpcoming = createElements('span', 'upcoming');
                        spanUpcoming.appendChild(createElements('span', 'symbol', weather[threeDaysData.condition]));
                        spanUpcoming.appendChild(createElements('span', 'forecast-data', `${threeDaysData.low}${weather.Degrees}/${threeDaysData.high}${weather.Degrees}`));
                        spanUpcoming.appendChild(createElements('span', 'forecast-data', threeDaysData.condition));
                        divForecastInfo.appendChild(spanUpcoming);
                    }
                }
            }

            if (!allTowns.includes(inputText.value)) {
                throw new Error;
            }
        } catch (error) {
            divForecastId.style.display = 'block';
            divForecast.textContent = 'Error'
        }

    }

    function createElements(type, nameClass, text) {

        let element = document.createElement(type);

        if (nameClass) {
            element.className = nameClass;
        }
        if (text) {
            element.textContent = text;
        }
        return element;
    }
}
attachEvents();