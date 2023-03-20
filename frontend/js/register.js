const $ = document

// import register users
import { registerUser, loginUser } from './function/auth.js'


// --------------------------------------------------


// login - register change pages
const signInBtn = $.querySelector('.header-register_right_sign-in')
const logInBtn = $.querySelector('.header-register_right_log-in')
const signInForm = $.querySelector('.register-body_right_sign-in')
const logInForm = $.querySelector('.register-body_right_log-in')
const error = $.querySelector('.register-body_right_error')
const closeErrorBtn = $.querySelector('.register-body_right_error_btn')

// register inputs
const nameInput = $.querySelector('#name')
const usernameInput = $.querySelector('#username')
const emailInput = $.querySelector('#email')
const phoneInput = $.querySelector('#phone')
const passwordInput = $.querySelector('#password')
const submitBtn = $.querySelector('.register-body_right_sign-in_submit')

// login inputs
const usernameInputLogin = $.querySelector('#log-in_username')
const passwordInputLogin = $.querySelector('#log-in_password')
const submitBtnLogin = $.querySelector('.register-body_right_log-in_submit')

// regex
const regexPassword = /[a-zA-z]+[0-9]/
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const regexPhone = /09(1[0-9]|3[1-9]|2[012]|9[012])[0-9]{3}[0-9]{4}/


// --------------------------------------------------


// remove active class from login - register btns
function registerClearActiveBtn() {
    signInBtn.classList.remove('active-header-register-btn')
    logInBtn.classList.remove('active-header-register-btn')
}

// close all form
function closeAllForm() {
    error.classList.remove('register-body_right-active')
    signInForm.classList.remove('register-body_right-active')
    logInForm.classList.remove('register-body_right-active')
}

// active form
function activeForm(elem) {
    closeAllForm()
    elem.classList.add('register-body_right-active')
}

// active class to login or register btns
function registerBtnActive(elem) {
    if (!elem.className.includes('active-header-register-btn')) {
        registerClearActiveBtn()
        elem.classList.add('active-header-register-btn')
    }

    if (elem.dataset.form === 'signIn' && !signInForm.className.includes('register-body_right-active')) {
        activeForm(signInForm)
    }
    else if (elem.dataset.form === 'logIn' && !logInForm.className.includes('register-body_right-active')) {
        activeForm(logInForm)
    }
}


// --------------------------------------------------


// active class to login or register btns
signInBtn.addEventListener('click', e => {
    registerBtnActive(e.target)
})

logInBtn.addEventListener('click', e => {
    registerBtnActive(e.target)
})

// comment slider
const commentsSlider = new Swiper('.swiper-comments', {
    spaceBetween: 20,
    grabCursor: true,
    pagination: {
        el: ".swiper-comments_pagination",
    },
});

// register user
submitBtn.addEventListener('click', e => {
    e.preventDefault()

    const userNameValidate = !usernameInput.value.includes(" ")
    const emailValidate = emailInput.value.match(regexEmail)
    const phoneValidate = phoneInput.value.match(regexPhone)
    const passwordValidate = passwordInput.value.match(regexPassword)

    if (userNameValidate
        && emailValidate
        && phoneValidate
        && passwordValidate
        && nameInput.value.length >= 6
        && usernameInput.value.length >= 4
        && passwordInput.value.length >= 6) {
        registerUser()
    }
    else {
        registerClearActiveBtn()
        closeAllForm()
        error.dataset.back = 'signin'
        error.classList.add('register-body_right-active')
    }
})

// login user
submitBtnLogin.addEventListener('click', e => {
    e.preventDefault()
    const loginUserNameValidate = !usernameInputLogin.value.includes(" ")
    const loginPasswordValidate = passwordInputLogin.value.match(regexPassword)

    if (loginUserNameValidate
        && loginPasswordValidate
        && usernameInputLogin.value.length >= 4
        && passwordInputLogin.value.length >= 6) {
        loginUser()
    }
    else {
        registerClearActiveBtn()
        closeAllForm()
        error.dataset.back = 'login'
        error.classList.add('register-body_right-active')
    }
})

// error back to form
closeErrorBtn.addEventListener('click', () => {
    if (error.dataset.back === 'signin') {
        registerBtnActive(signInBtn)
    }
    else     {
        registerBtnActive(logInBtn)
    }
})