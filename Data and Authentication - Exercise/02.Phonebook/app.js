function attachEvents() {

    //1st step load all phone numbers and create btn delete
    //2nd step post new phone number
    //3nt step delete phone number with id

    const url = 'http://localhost:3030/jsonstore/phonebook';
    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const inputPerson = document.getElementById('person');
    const inputPhone = document.getElementById('phone');


    loadBtn.addEventListener('click', onLoad);
    createBtn.addEventListener('click', onCreate);

    async function onLoad() {
        ul.innerHTML = '';

        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).forEach(el => {

            let li = document.createElement('li');
            let btnDelete = document.createElement('button');

            btnDelete.textContent = 'Delete'
            btnDelete.addEventListener('click', onDelete);

            li.textContent = `${el.person}: ${el.phone}`
            li.setAttribute('id', el._id)
            li.appendChild(btnDelete);
            ul.appendChild(li);

        });
    }

    async function onDelete(ev) {


        let id = ev.target.parentElement.id;

        const options = {

            method: 'DELETE',

        }

        await fetch(`${url}/${id}`, options);

        onLoad()
    }

    async function onCreate() {

        const data = {
            person: inputPerson.value,
            phone: inputPhone.value,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        inputPerson.value = '';
        inputPhone.value = '';

        onLoad()
    }
}

attachEvents();