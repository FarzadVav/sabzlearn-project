const $ = document
import { getMe } from "./function/auth.js";
import { getNavbarMenus } from "./function/utility.js";


// --------------------------------------------------------


const navbarAccount = $.querySelector('#navbar-account')
const navbarAccountUsername = $.querySelector('#navbar-account_username')
const navbarRegister = $.querySelector('#register-user')

const mobileMenu = $.querySelector('.mobile-menu')
const mobileMenuBtn = $.querySelector('#mobile-menu')
const closeMobileMenuBtn = $.querySelector('#close-mobile-menu')
// navbar
const allCourse = $.querySelector('#all-course')
// mobile menu
const mobileAllCourse = $.querySelector('#mobile-all-course')


// --------------------------------------------------------


// mobile menu
function toggleMobileMenu(e, elem) {
    if (e.target.className.includes('active-mobile-menu')) {
        e.target.classList.remove('active-mobile-menu')
        elem.classList.add('active-mobile-menu')
    }
    else {
        e.target.classList.add('active-mobile-menu')
        elem.classList.remove('active-mobile-menu')
    }
}


// --------------------------------------------------------

// set token - get navbar menus
window.addEventListener('load', () => {
    // set token
    getMe()
        .then(Response => {
            console.log(Response);
            if (Response) {
                navbarAccount.style.display = 'flex'
                navbarAccountUsername.innerHTML = Response.name
            }
            else {
                navbarRegister.style.display = 'flex'
            }
        })

    // get navbar menus
    getNavbarMenus()
        .then(Result => {
            for (let i = 0; i < Result.length; i++) {
                allCourse.insertAdjacentHTML('afterend', `
                <li class="navbar_list-right_item flex gap1" id="navbar-frontend">
                    <a href="category.html?cat=${Result[i].href}" class="navbar_list-right_item_link">${Result[i].title}</a>
                    ${Result[i].submenus.length > 0 ?
                        `
                            <i class="bi bi-chevron-down min-icon dropdown-arrow"></i>
                            <ul class="navbar-right_submenu flex column align-strat gap2" id="submenu-frontend">
                            ${Result[i].submenus.map((item) => {
                            return `
                                        <li class="navbar-right_submenu_item">
                                            <a href="course.html?name=${item.href}" class="navbar-right_submenu_item_link">${item.title}</a>
                                        </li>
                                        `
                        }).join('')
                        }
                            </ul>
                            `
                        : ''
                    }
                </li>
            `)
                // mobile menu
                mobileAllCourse.insertAdjacentHTML('afterend', `
                    <li class="mibole-menu_item flex w100">
                        <a href="category.html?cat=${Result[i].href}" class="mobile-menu_link flex w100">${Result[i].title}</a>
                    </li>
                `)
            }
        })
})

// mobile menu
mobileMenuBtn.addEventListener('click', e => {
    toggleMobileMenu(e, closeMobileMenuBtn)
    mobileMenu.style.display = 'flex'
})

closeMobileMenuBtn.addEventListener('click', e => {
    toggleMobileMenu(e, mobileMenuBtn)
    mobileMenu.classList.add('close-mobile-menu')
})

mobileMenu.addEventListener('animationend', e => {
    if (e.animationName === 'closeMobileMenu') {
        mobileMenu.classList.remove('close-mobile-menu')
        mobileMenu.style.display = 'none'
    }
})