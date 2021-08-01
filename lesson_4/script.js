'use strict';

function regxpText(text) {
    const regexp = /^'|(\s)'|'(\s)|'$/g;
    return text.replace(regexp, '"');;
}

document.querySelector('.btn-regxp').addEventListener('click', () => {
    let arrText = document.querySelectorAll('.word p');
    let resultText = [];

    arrText.forEach(el => resultText.push(regxpText(el.innerHTML)));


    resultText.forEach(el => {
        document.querySelector('.result').insertAdjacentHTML('beforeend', `<p>${el}</p>`)
    });
})


//Проверка данных формы
function valideForm() {
    const regexp_name = /^[a-zа-яё]+$/gi,
        regexp_email = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
        regexp_phone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/,
        regexp_message = /[a-zа-яё0-9]/;

    let name = document.querySelector('#name').value,
        email = document.querySelector('#email').value,
        phone = document.querySelector('#phone').value,
        message = document.querySelector('#message').value,
        error = '';

    // Проверяем имя
    if (regexp_name.test(name) === true) {
        let c = document.querySelector('#name');
        c.classList.add('done_val');
        if (!c.classList.contains('none')) {
            document.querySelector('#error-name').classList.add('none');
            c.classList.remove('error_val');
        }
    } else {
        document.querySelector('#name').classList.add('error_val');
        document.querySelector('#error-name').classList.remove('none');
    }

    // Проверяем телефон
    if(regexp_phone.test(phone) === true) {
        let c = document.querySelector('#phone');
        c.classList.add('done_val');
        if (!c.classList.contains('none')) {
            document.querySelector('#error-phone').classList.add('none');
            c.classList.remove('error_val');
        }
    } else {
        document.querySelector('#phone').classList.add('error_val');
        document.querySelector('#error-phone').classList.remove('none');
    }

    // Проверяем email
    if(regexp_email.test(email) === true) {
        let c = document.querySelector('#email');
        c.classList.add('done_val');
        if (!c.classList.contains('none')) {
            document.querySelector('#error-email').classList.add('none');
            c.classList.remove('error_val');
        }
    } else {
        document.querySelector('#email').classList.add('error_val');
        document.querySelector('#error-email').classList.remove('none');
    }

    // Проверяем сообщение
    if(regexp_message.test(message) === true) {
        let c = document.querySelector('#message');
        c.classList.add('done_val');
        if (!c.classList.contains('none')) {
            document.querySelector('#error-message').classList.add('none');
            c.classList.remove('error_val');
        }
    } else {
        document.querySelector('#message').classList.add('error_val');
        document.querySelector('#error-message').classList.remove('none');
    }
}
document.querySelector('.button').addEventListener("click", valideForm);