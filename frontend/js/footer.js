const $ = document
import { footerMenu } from "./function/utility.js"


// -----------------------------------


const footerCourses = $.querySelector('#footer-courses')


// -----------------------------------


window.addEventListener('load', () => {
    footerMenu()
    .then(Result => {
        const shuffledItems = Result.sort(() => 0.5 - Math.random())
        shuffledItems.slice(0, 4).map(item => {
            footerCourses.innerHTML += 
            `
            <a href="${item.href}" class="footer_item_link">${item.title}</a>
            `
        })
    })
})


// -----------------------------------