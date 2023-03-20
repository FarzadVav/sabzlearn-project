const $ = document
import { adminInfo } from "./utility.js"
import { getURLParams } from "./../../function/utility.js"


// ------------------------------------------------


const adminName = $.querySelector('.sidebar_adminname')
// sidebar btns
const sidebarBtns = $.querySelectorAll('.sidebar_item')
const sidebarIndexBtn = $.querySelector('#index')


// -------------------------------------------------


const clearBtnsActive = () => {
    sidebarBtns.forEach(btn => {
        btn.classList.remove('sidebar_item-active')
    })
}

// access admin & active btns
window.addEventListener('load', () => {
    // active btns
    const params = getURLParams('btn')
    if (params) {
    clearBtnsActive()
        const button = $.querySelector(`#${params}`)
        button.classList.add('sidebar_item-active')
    }
    else {
        clearBtnsActive()
        sidebarIndexBtn.classList.add('sidebar_item-active')
    }

    // access admin
    adminInfo()
        .then(admin => {
            if (admin.role === "USER") {
                location.href = 'http://127.0.0.1:5500/frontend/register.html'
            }
            else {
                console.log(admin);
                adminName.innerHTML = `
                ${admin.name}
                <span class="welcome_adminname"> خوش آمدید!</span>
                `
            }
        })
})