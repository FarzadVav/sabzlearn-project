// select accordions
const accordions = $.querySelectorAll('.accordion'),
    accordionsHead = $.querySelectorAll('.accordion_head'),
    accordionsTitle = $.querySelectorAll('.accordion_head_title'),
    accordionsIcons = $.querySelectorAll('.accordion_head_icon'),
    accordionsContent = $.querySelectorAll('.accordion_content')

// target accordion variables
let accordionTitle, accordionIcon, accordionContent

// close all accordions after click 
function closeAllAccordions () {
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].classList.remove('active-accordion')
        accordionsTitle[i].style.color = 'var(--white-color)'
        accordionsIcons[i].classList.remove('bi-dash')
        accordionsIcons[i].classList.add('bi-plus')
        accordionsContent[i].style.height = '0px'
    }
}

// open accordion
accordions.forEach(accordion => {
    accordion.addEventListener('click', e => {
        if (accordion.className.includes('active-accordion')
         && e.target.dataset.id !== 'dont-close') {
            closeAllAccordions()
            accordion.classList.remove('active-accordion')
        }
        else {
            closeAllAccordions()
            
            accordion.classList.add('active-accordion')
    
            accordionTitle = accordion.querySelector('.accordion_head_title')
            accordionIcon = accordion.querySelector('.accordion_head_icon')
            accordionContent = accordion.querySelector('.accordion_content')
            
            accordionTitle.style.color = 'var(--primary-color)'
            accordionIcon.classList.remove('bi-plus')
            accordionIcon.classList.add('bi-dash')
            accordionContent.style.height = `${accordionContent.scrollHeight}px`  
        }

    })
});