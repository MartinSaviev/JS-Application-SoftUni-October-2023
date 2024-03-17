function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const result = document.getElementsByClassName('info')[0];
    const ulr = 'http://localhost:3030/jsonstore/bus/schedule/'
    
    stopId = {
        currStop: 'depot',
        next: ''
    }

    async function depart() {

        try {

            const response = await fetch(`${ulr}${stopId.currStop}`);
            const data = await response.json();

            stopId.currStop = data.name;
            stopId.next = data.next;

            departBtn.disabled = true;
            arriveBtn.disabled = false;
            result.textContent = `Next stop ${stopId.currStop}`
        } catch (error) {
            result.textContent = 'Error'
            departBtn.disabled = false;
            arriveBtn.disabled = false;

        }
    }

    function arrive() {

        departBtn.disabled = false;
        arriveBtn.disabled = true;
        result.textContent = `Arriving at ${stopId.currStop}`
        stopId.currStop = stopId.next;
    }


    return {
        depart,
        arrive
    };
}

let result = solve();