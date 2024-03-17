async function solution() {

    const url = 'http://localhost:3030/jsonstore/advanced/articles'

    const res = await fetch(`${url}/list`)
    const data = await res.json();
    const main = document.getElementById('main');

    for (const key in data) {

        const response = await fetch(`${url}/details/${data[key]._id}`);
        const info = await response.json();

        let divAccordion = createElements('div', 'accordion');
        let divHead = createElements('div', 'head');
        divAccordion.appendChild(divHead);
        divHead.appendChild(createElements('span', undefined, undefined, data[key].title));
        const btnMore = createElements('button', 'button', data[key]._id, 'More');
        divHead.appendChild(btnMore);
        let divExtra = createElements('div', 'extra');
        divAccordion.appendChild(divExtra);
        divExtra.appendChild(createElements('p', undefined, undefined, info.content,));
        main.appendChild(divAccordion);
        btnMore.addEventListener('click', showText);

        function showText(ev) {
            let text = ev.target.textContent;
            if (text === 'More') {
                ev.target.textContent = 'Less';
                divExtra.style.display = 'block';

            } else {
                ev.target.textContent = 'More';
                divExtra.style.display = 'none';

            }
        }
    }

    function createElements(type, className, id, textCon) {
        let elem = document.createElement(type);

        if (className) {
            elem.className = className;
        }
        if (id) {
            elem.id = id;
        }
        if (textCon) {
            elem.textContent = textCon;
        }

        return elem;
    }



}
solution()