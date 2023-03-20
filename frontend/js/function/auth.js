const $ = document

import { saveToLocalStorage, sweetAlert, getToken } from "./utility.js"


//-----------------------------------------------------------------


// register inputs
const nameInput = $.querySelector('#name')
const usernameInput = $.querySelector('#username')
const emailInput = $.querySelector('#email')
const phoneInput = $.querySelector('#phone')
const passwordInput = $.querySelector('#password')
const submitBtn = $.querySelector('.register-body_right_sign-in_submit')
const submitBtnText = $.querySelector('.sign-in_btn_text')
const submitBtnLoader = $.querySelector('.sign-in_btn_loader')

// login inputs
const usernameInputLogin = $.querySelector('#log-in_username')
const passwordInputLogin = $.querySelector('#log-in_password')
const submitBtnLogin = $.querySelector('.register-body_right_log-in_submit')
const submitBtnTextLogin = $.querySelector('.log-in_btn_text')
const submitBtnLoaderLogin = $.querySelector('.log-in_btn_loader')


//-----------------------------------------------------------------


// submit loaders
function startLoader(btn, text, loader) {
    btn.classList.add('active-submit')
    text.style.display = 'none'
    loader.style.display = 'block'
}

function endLoader(btn, text, loader) {
    btn.classList.remove('active-submit')
    text.style.display = 'block'
    loader.style.display = 'none'
}

// clear login and register inputs
function clearInputs() {
    nameInput.value = ''
    usernameInput.value = ''
    emailInput.value = ''
    phoneInput.value = ''
    passwordInput.value = ''
    usernameInputLogin.value = ''
    passwordInputLogin.value = ''
}

// register user
const registerUser = () => {
    startLoader(submitBtn, submitBtnText, submitBtnLoader)

    const newUserInfo = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: passwordInput.value.trim()
    }

    fetch('http://localhost:4000/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserInfo)
    })
    .then(Response => {
        if (Response.status === 201) {
            sweetAlert('ثبت نام با موفقیت انجام شد', 'به آکادمی سبزلرن خوش آمدید', 'success', 'ورود به پنل', Response => {
                if (Response.isConfirmed) {
                    location.href = 'index.html'
                }
            })
            clearInputs()
        }

        else if (Response.status === 409) {
            sweetAlert('نام کاربری یا ایمیل قبلا استفاده شده!', 'از مقادیر جدید استفاده کنید', 'error', 'متوجه شدم', () => {})
        }

        endLoader(submitBtn, submitBtnText, submitBtnLoader)
        return Response.json()
    })
    .then(Result => {
        console.log(Result);
        saveToLocalStorage('user', { token: Result.accessToken })
    })
}

// login user
const loginUser = () => {
    startLoader(submitBtnLogin, submitBtnTextLogin, submitBtnLoaderLogin)

    const userInfo = {
        identifier: usernameInputLogin.value.trim(),
        password: passwordInputLogin.value.trim()
    }

    fetch('http://localhost:4000/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(Response => {
        if (Response.status === 200) {
            sweetAlert('وارد حسابتان شدید', 'به آکادمی سبزلرن خوش آمدید', 'success', 'ورود به پنل', Response => {
                if (Response.isConfirmed) {
                    location.href = 'index.html'
                }
            })
            clearInputs()
        }

        else if (Response.status === 401) {
            sweetAlert('نام کاربری - ایمیل یا رمز عبورتان اشتباه است!', 'لطفا اطلاعات درست را وارد کنید', 'error', 'متوجه شدم', () => {})
        }

        endLoader(submitBtnLogin, submitBtnTextLogin, submitBtnLoaderLogin)
        return Response.json()
    })
    .then(Result => {
        console.log(Result);
        saveToLocalStorage('user', { token: Result.accessToken })
    })

}

// get me
const getMe = async () => {
    const token = getToken()
    
    if (token) {
        const Response = await fetch('http://localhost:4000/v1/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const Result = await Response.json()
        return Result
    }
    else {
        return false
    }
}


//-----------------------------------------------------------------


export { registerUser, loginUser, getMe }