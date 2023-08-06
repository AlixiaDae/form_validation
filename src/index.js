import './scss/style.scss';
import { getCodes, getNames } from 'country-list';
import { validate } from 'postal-codes-js';

// For each country, create an option element, set textContent to country name and set value to country code

const selectElement = document.getElementById("country")

const submitBtn = document.getElementById("submit-button")

function createSelectElements(n) {
    if(n >= 249) return selectElement 
        const optionElement = document.createElement("option")
        optionElement.textContent = getNames()[n]
        optionElement.setAttribute("value", getCodes()[n])
        selectElement.appendChild(optionElement)
        return createSelectElements(n + 1)
}

function checkInputs() {
    const warnings = document.querySelectorAll(".warning")
    warnings.forEach(warning => {
        if(warning.closest(".input-box").querySelector("input") === "") {
            warning.classList.add("show")
        } else if (warning.closest(".input-box").querySelector("input").checkValidity()) {
            warning.classList.remove("show")
        } else if (!warning.closest(".input-box").querySelector("input").checkValidity()) {
            warning.classList.add("show")
        }
    })
}

function checkZIP() {
    const zipElement = document.getElementById("zipcode")
    const selectValue = selectElement.value
    if (zipElement.value === "") return
    if (validate(selectValue, zipElement.value) !== true) {
        document.querySelectorAll(".warning")[1].classList.add("show")
    } else {
        document.querySelectorAll(".warning")[1].classList.remove("show")
    }
}

function confirmPass() {
    const passElement = document.getElementById("password")
    const confirmPassElement = document.getElementById("confirmpassword")
    if(confirmPassElement.value === "") {
        document.querySelectorAll(".warning")[3].classList.add("show")
        confirmPassElement.style.border = "1px solid rgb(253, 63, 63)"
    } else if(confirmPassElement.value !== passElement.value) {
        document.querySelectorAll(".warning")[3].classList.add("show")
        confirmPassElement.style.border = "1px solid rgb(253, 63, 63)"
    } else {
        document.querySelectorAll(".warning")[3].classList.remove("show")
        confirmPassElement.style.border = "1px solid rgb(63, 180, 63)"
    }
}

submitBtn.addEventListener("click", (e) => {   
    e.preventDefault()
    checkInputs()
    checkZIP()
    confirmPass()
})



createSelectElements(0)




