import {Validator} from './validator.js';

const button = document.getElementById("submit");
let form = document.querySelector(".main_form");


button.addEventListener('click', async () => {
    let xEntity = form.querySelectorAll('.checkbox:checked'),
    yEntity = form.querySelector('[name="y"]'),
    rEntity = form.querySelector('[name="r"]:checked');

    let validator = new Validator(xEntity, yEntity, rEntity);
    if (validator.validate()) {
        let x = xEntity[0].value, y = yEntity.value, r = rEntity.value;

        const params = new URLSearchParams(); 
        params.set('x', x);
        params.set('y', y);
        params.set('r', r);


        let response = await fetch(`https://se.ifmo.ru/~s368675/php/handler.php`, {
            method: 'POST',
            body: params
        })
        try {
            if (!response.ok) {
                const errorResponse = await response.json();
                alert(`Server error: ${errorResponse.error_message}`);
                return false;
            }
            let serverAnswer = await response.text();
            localStorage.setItem("session", serverAnswer);
            document.getElementById("output").innerHTML = serverAnswer;
        } catch (err) {
            alert(`There was an error processing your request: ${err.message}`)
        }
    } else {
        alert(validator.message)
    }
    
    
});
