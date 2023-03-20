import { getToken } from "./../../function/utility.js"


// ---------------------------------------------------

// get admin infos 
const adminInfo = async () => {
    const Response = await fetch('http://localhost:4000/v1/auth/me', {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
    const Result = await Response.json()
    return Result
}

//get All category
const getAllcategory = async () => {
    const Response = await fetch('http://localhost:4000/v1/category')
    const Result = Response.json()
    return Result
}

// get all menus
const getAllMenus = async ()=> {
    const Response = await fetch('http://localhost:4000/v1/menus/all')
    const Result = Response.json()
    return Result
}

// get all users
const getAllUsers = async () => {
    const Response = await fetch('http://localhost:4000/v1/users', {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
    const Result = await Response.json()
    return Result
}

// get all category
const getAllCategory = async () => {
    const Response = await fetch('http://localhost:4000/v1/category', {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
    const Result = await Response.json()
    return Result
}

// get all session
const getAllSessions = async () => {
    const Response = await fetch('http://localhost:4000/v1/courses/sessions')
    const Result = await Response.json()
    return Result
}

export {
    adminInfo,
    getAllcategory,
    getAllMenus,
    getAllUsers,
    getAllCategory,
    getAllSessions,
}