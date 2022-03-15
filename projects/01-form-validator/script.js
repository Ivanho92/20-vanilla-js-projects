// Get HTML elements
const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordRepeat = document.getElementById('password-repeat');


// Load Event Listeners
username.addEventListener('blur', () => validateUsername(username));
email.addEventListener('blur', () => validateEmail(email));
password.addEventListener('blur', () => validatePassword(password));
passwordRepeat.addEventListener('blur', () => validatePasswordConfirmation(passwordRepeat, password));
form.addEventListener('submit', e => {
    e.preventDefault();

    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    validatePasswordConfirmation(passwordRepeat, password);
})



// Validate Fields
function validateUsername(input) {
    if (!validateField(input, input.value.length !== 0, 'Username is required')) return;
    if (!validateField(input, input.value.length >= 3, 'Username must be at least 3 characters')) return;
    if (!validateField(input, input.value.length <= 15, 'Username must not exceed 15 characters')) return;
}

function validateEmail(input) {
    const emailRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
    if (!validateField(input, input.value.length !== 0, 'Email is required')) return;
    if (!validateField(input, emailRegex.test(email.value), 'Email is not valid')) return;
}

function validatePassword(input) {
    if (!validateField(input, input.value.length !== 0, 'Password is required')) return;
    if (!validateField(input, input.value.length >= 6, 'Password must be at least 6 characters')) return;
}

function validatePasswordConfirmation(confirmationPassword, originalPassword) {
    if (!validateField(confirmationPassword, confirmationPassword.value.length !== 0, 'Password confirmation is required')) return;
    if (!validateField(confirmationPassword, confirmationPassword.value === originalPassword.value, 'Password does not match')) return;
}





// Validation Functions
function validateField(input, validationPattern, errorMessage) {
    if (validationPattern) {
        drawValidation(input, true, 'Validated!');
        return true;
    } else {
        drawValidation(input, false, errorMessage);
        return false;
    }
}

function drawValidation(formInputElement, isValidated, message) {
    if (isValidated) {
        formInputElement.classList.add('validated');
        formInputElement.classList.remove('validation-error');
        formInputElement.nextElementSibling.style.visibility = 'hidden';
    } else {
        formInputElement.classList.add('validation-error');
        formInputElement.classList.remove('validated');
        formInputElement.nextElementSibling.style.visibility = 'visible';
    }
    formInputElement.nextElementSibling.textContent = message;
}