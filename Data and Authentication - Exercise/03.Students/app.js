const btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', onSubmit);

const url = 'http://localhost:3030/jsonstore/collections/students'
const inputFirstName = document.querySelector('input[name="firstName"]');
const inputLastName = document.querySelector('input[name="lastName"]');
const inputFacultyNumber = document.querySelector('input[name="facultyNumber"]');
const inputGrade = document.querySelector('input[name="grade"]');
const tbody = document.querySelector('tbody');

async function loadStudent() {

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    for (const key in data) {
       console.log(data[key]);
       
        const tr = document.createElement('tr');
    
        tr.appendChild(create('td', data[key].firstName));
        tr.appendChild(create('td', data[key].lastName));
        tr.appendChild(create('td', data[key].facultyNumber))
        tr.appendChild(create('td', data[key].grade));
        tbody.appendChild(tr);
        
    }


}

loadStudent()

async function onSubmit(ev) {
    ev.preventDefault();

    const tr = document.createElement('tr');

    tr.appendChild(create('td', inputFirstName.value));
    tr.appendChild(create('td', inputLastName.value));
    tr.appendChild(create('td', inputFacultyNumber.value));
    tr.appendChild(create('td', inputGrade.value));
    tbody.appendChild(tr);

    const obj = {

        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        facultyNumber: inputFacultyNumber.value,
        grade: inputGrade.value,

    }

    const options = {

        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(obj),

    }

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    inputFirstName.value = '';
    inputLastName.value = '';
    inputFacultyNumber.value = '';
    inputGrade.value = '';

    

}

function create(type, content) {
        let element = document.createElement(type)
        element.textContent = content
        return element
    }



