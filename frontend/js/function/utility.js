// sweet alert
const sweetAlert = (title, text, icon, confirmButtonText, callback) => {
    Swal.fire({
        background: '#35374d',
        color: '#efefef',
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText
    })
    .then(Response => {
        if (callback) {
            callback(Response)
        }
    })
}

// local storage
const saveToLocalStorage = (key, value) => {
    localStorage.clear()
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.stringify(localStorage.getItem(key))
}

const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem('user'))
    return userToken ? userToken.token : null
}

// URL params
const getURLParams = key => {
    const url = new URLSearchParams(window.location.search)
    return url.get(key)
}

// min ltter
function letterName(string, length) {
    let name = ''
    if (length >= 20) {
        for (let i = 0; i < 23; i++) {
            if (i < 20) {
                name += string[i]
            }
            else {
                name += '.'
            }
        }
    }
    else {
        return string
    }
    return name
}

// get navbar menus
const getNavbarMenus = async () => {
    const Response = await fetch('http://localhost:4000/v1/menus')
    const Result = await Response.json()
    return Result
}

// get courses
const getCourses = async () => {
    const Response = await fetch('http://localhost:4000/v1/courses')
    const Result = await Response.json()
    return Result
}

// showCourses
const showCourses = (array, container, length) => {
    container.innerHTML = ''
    for (let i = 0; i < length; i++) {
        container.insertAdjacentHTML('beforeend', `
          <div class="product">
            <img src="http://localhost:4000/courses/covers/${array[i].cover}" alt="product" class="product-img">
            <div class="product-bottom flex column between">
                <span class="product-bottom_category">${array[i].categoryID ? array[i].categoryID : 'دسته بندی نشده'}</span>
                <a href="course.html?name=${array[i].shortName}" class="product-bottom_name flex">
                  ${letterName(array[i].name, array[i].name.length)}
                </a>
                <div class="product-bottom_prices flex gap3 wrap">
                      <span class="product-bottom_prices_price">
                        ${array[i].price ? array[i].price.toLocaleString() : "رایگان"}
                    </span>
                </div>
            </div>
            <div class="product-bottom_status flex between">
                <span class="product-bottom_status_teacher">${array[i].creator}</span>
                <span class="product-bottom_status_users">
                    <span class="product-bottom_status_users_count">${array[i].registers}</span> دانشجو
                </span>
            </div>
          </div>
        `)
    }
}

// get pre sell courses
const getPreSellCourses = async () => {
    const Response = await fetch('http://localhost:4000/v1/courses/presell')
    const Result = Response.json()
    return Result
}

// get blogs
const getBlogs = async () => {
    const Response = await fetch('http://localhost:4000/v1/articles')
    const Result = await Response.json()
    return Result
}

// show blogs
const showBlogs = (array, container, length) => {
    container.innerHTML = ''
    for (let i = 0; i < length; i++) {
        container.insertAdjacentHTML('beforeend', `
          <div class="blog flex column">
            <img src="http://localhost:4000/courses/covers/${array[0].cover}" alt="blog" class="blog-img">
            <div class="blog-bottom flex column between gap3 w100 pb2">
                <span class="blog-bottom_creator">${array[i].creator.name}</span>
                <a href="blog.html?name=${array[i].shortName}" class="blog-bottom_name flex">
                  ${letterName(array[i].title, array[i].title.length)}
                </a>
            </div>
          </div>
        `)
    }
}

// get footer menu
const footerMenu = async () => {
    const Response = await fetch('http://localhost:4000/v1/menus/topbar')
    const Result = await Response.json()
    return Result
}

// get category
const getCategory = async () => {
    const categoryName = getURLParams('cat')

    if (categoryName === 'all') {
        return getCourses()
    }

    const Response = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const Result = await Response.json()
    return Result
}

// filter in category
const filterCategoey = (array, filterType) => {
    let filteredCategory = []
    switch (filterType) {
        case 'news':
            filteredCategory = [...array]
            break;
        case 'register':
            filteredCategory = [...array].sort((a, b) => a.register - b.register)
            break;
        case 'money':
            filteredCategory = [...array].sort((a, b) => a.price - b.price)
            break;
        case 'old':
            filteredCategory = [...array].reverse()
            break;
        default:
            filteredCategory = [...array]
            break;
    }
    return filteredCategory
}

// search in category
const searchCategory = (array, searchItem, searchValue) => {
    const searchedCategory = [...array].filter(item => item[searchItem].toLowerCase().includes(searchValue.toLowerCase()))
    return searchedCategory
}

// get one course
const getOneCourse = async () => {
    const courseShortName = getURLParams('name')
    const Response = await fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` }
    })
    const Result = await Response.json()
    return Result
}

// get episode
const getEpisode = async () => {
    const shortName = getURLParams('name')
    const episodeId = getURLParams('id')
    const Response = await fetch(`http://localhost:4000/v1/courses/${shortName}/${episodeId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    const Result = await Response.json()
    return Result
}

// post massage - contact us
const contactUs = async () => {
    const name = $.querySelector('#name')
    const email = $.querySelector('#email')
    const phone = $.querySelector('#phone')
    const textarea = $.querySelector('#textarea')
    const newMassage = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        body: textarea.value.trim()
    }

    const Response = await fetch('http://localhost:4000/v1/contact', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newMassage)
    })
    const Result = await Response.json()
    return Result
}

// post comment
const postComment = async (body, courseShortName, score) => {
    const newComment = {
        body,
        courseShortName,
        score
    }

    const Response = await fetch('http://localhost:4000/v1/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })

    const Result = await Response.json()
    return Result
}

// get one blog
const getOneBlogs = async () => {
    const params = getURLParams('name')
    const Response = await fetch(`http://localhost:4000/v1/articles/${params}`)
    const Result = await Response.json()
    return Result
}


// --------------------------------------------------------


export {
    sweetAlert,
    saveToLocalStorage,
    getFromLocalStorage,
    getToken,
    getURLParams,
    getNavbarMenus,
    getCourses,
    showCourses,
    letterName,
    getPreSellCourses,
    getBlogs,
    showBlogs,
    footerMenu,
    getCategory,
    filterCategoey,
    searchCategory,
    getOneCourse,
    getEpisode,
    contactUs,
    postComment,
    getOneBlogs
}