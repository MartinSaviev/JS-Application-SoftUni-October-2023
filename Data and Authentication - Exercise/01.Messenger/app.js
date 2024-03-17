function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const btnRefresh = document.getElementById('refresh');
    const btnSend = document.getElementById('submit');
    const textMessage = document.getElementById('messages');
    const inputName = document.querySelector('input[name="author"');
    const inputMessage = document.querySelector('input[name="content"]');

    btnRefresh.addEventListener('click', onLoad);
    btnSend.addEventListener('click', onSend);


    let array = [];
    async function onLoad() {

        const response = await fetch(url);
        const data = await response.json();

        for (const key in data) {
            array.push(`${data[key].author}: ${data[key].content}`);
        }
        textMessage.textContent = array.join('\n');

    }
    function onSend() {

        const objMessage = {
            author: inputName.value,
            content: inputMessage.value,
        };

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objMessage)
        };

        fetch(url, options);

        inputName.value = '';
        inputMessage.value = '';
    }

}

attachEvents();