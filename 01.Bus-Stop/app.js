async function getInfo() {
    const stopIdElement = document.getElementById('stopId');
    const stopId = stopIdElement.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    stopIdElement.value = '';
    buses.innerHTML = '';

    try {
        const response = await fetch(url); // headers
        const data = await response.json() // body
        const busStopName = data.name;
        const busStops = data.buses;

        for (const busId in busStops) {

            let li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${busStops[busId]} minutes`
            buses.appendChild(li);
        }
        stopName.textContent = busStopName;


    } catch (error) {
        stopName.textContent = 'Error'
    }
}