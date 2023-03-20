const $ = document

// -----------------------------------------------


const spinner = $.querySelector('.spinner-wrapper')


// -----------------------------------------------


window.addEventListener('load', () => {
    spinner.style.display = 'none'
    $.body.style.overflowY = 'scroll'
})