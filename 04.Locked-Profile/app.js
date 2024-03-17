async function lockedProfile() {

    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await response.json();
    let counter = 1;
    for (const key in data) {

        const username = data[key].username;
        const email = data[key].email;
        const age = Number(data[key].age);

        const main = document.getElementById('main');
        const divProfile = createElementsDivImg('div', null, 'profile');
        divProfile.appendChild(createElementsDivImg('img', './iconProfile2.png', 'userIcon'));
        divProfile.appendChild(createElementsLabelButton('label', 'Lock'));
        divProfile.appendChild(createElementsInputs('input', 'radio', `user${counter}Locked`, 'lock', true));
        divProfile.appendChild(createElementsLabelButton('label', 'Unlock'));
        divProfile.appendChild(createElementsInputs('input', 'radio', `user${counter}Locked`, 'unlock'));
        const br = document.createElement('br');
        divProfile.appendChild(br);
        const hr = document.createElement('hr');
        divProfile.appendChild(hr);
        divProfile.appendChild(createElementsLabelButton('label', 'Username'));
        divProfile.appendChild(createElementsInputs('input', 'text', `user${counter}Username`, username, null, 'disabled readonly'));
        const divUser = createElementsDivImg('div', null, `user${counter}Username`);
        divUser.style.display = 'none';
        const hr1 = document.createElement('hr');
        divUser.appendChild(hr1);
        divUser.appendChild(createElementsLabelButton('label', 'Email:'));
        divUser.appendChild(createElementsInputs('input', 'email', `user${counter}Email`, email, null, 'disabled readonly'));
        divUser.appendChild(createElementsLabelButton('label', 'Age:'));
        divUser.appendChild(createElementsInputs('input', 'text', `user${counter}Age`, age, null, 'disabled readonly'));
        divProfile.appendChild(divUser);
        divProfile.appendChild(createElementsLabelButton('button', 'Show more'));
        main.appendChild(divProfile);
        counter++;
    }
    function createElementsInputs(el, type, name, value, checked, disabledReadonly) {

        const element = document.createElement(el);

        if (type && name && value) {

            element.setAttribute('type', type)
            element.setAttribute('name', name)
            element.setAttribute('value', value)
        }

        if (disabledReadonly) {

            element.setAttribute('disabled', disabledReadonly)
        }
        if (checked) {
            element.setAttribute('checked', checked);
        }

        return element;
    }

    function createElementsLabelButton(el, text) {

        let element = document.createElement(el, text);
        if (!text === 'button') {
            element.textContent = text;
        } else {
            element.textContent = text;
            element.addEventListener('click', showMore);
        }

        return element;
    }

    function createElementsDivImg(el, img, className) {

        let element = document.createElement(el);
        if (img) {
            element.src = img;
        }
        if (className) {
            element.className = className;
        }

        return element;
    }

    function showMore(ev) {

        let trueOrFalse = ev.target.parentElement.querySelector('input[value="lock"]:checked');
        let button = ev.target.parentElement.children[10];
        if (!trueOrFalse) {

            if (button.textContent === 'Show more') {
                button.textContent = 'Hide it';
                ev.target.parentElement.children[9].style.display = 'block';
            } else {

                ev.target.parentElement.children[9].style.display = 'none';
                button.textContent = 'Show more';
            }
        }
    }
}