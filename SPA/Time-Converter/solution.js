function attachEventsListeners() {

    let inputDays = document.getElementById('days');
    let inputHours = document.getElementById('hours');
    let inputMinutes = document.getElementById('minutes');
    let inputSeconds = document.getElementById('seconds');

    let getDaysBtn = document.getElementById('daysBtn');
    let getHoursBtn = document.getElementById('hoursBtn');
    let getMinutesBtn = document.getElementById('minutesBtn');
    let getSecondsBtn = document.getElementById('secondsBtn');

    getDaysBtn.addEventListener('click', convertDays);
    getHoursBtn.addEventListener('click', convertHours);
    getMinutesBtn.addEventListener('click', convertMinutes);
    getSecondsBtn.addEventListener('click', convertSeconds);

    function convertDays() {

        let resultHours = Number(inputDays.value) * 24;
        inputHours.value = resultHours;
        inputMinutes.value = resultHours * 60;
        inputSeconds.value = inputMinutes.value * 60;

    }

    function convertHours() {

        let resultMinutes = Number(inputHours.value) * 60;
        inputDays.value = Number(inputHours.value) / 24;
        inputMinutes.value = resultMinutes
        inputSeconds.value = resultMinutes * 60;

    }

    function convertMinutes() {

        let resultSeconds = Number(inputMinutes.value) * 60;
        inputSeconds.value = resultSeconds;
        inputHours.value = inputMinutes.value / 60;
        inputDays.value = inputHours.value / 24;

    }
    function convertSeconds() {

        let seconds = Number(inputSeconds.value);
        inputMinutes.value = seconds / 60;
        inputHours.value = inputMinutes.value / 60;
        inputDays.value = inputHours.value / 24;

    }

}