const $ = document
import { getToken } from './../function/utility.js'
import { getAllSessions } from './function/utility.js'
import { getCourses } from './../function/utility.js'


// --------------------------------------------------


const newSession = $.querySelector('.new-session')
const sessionName = $.querySelector('#session-name')
const sessionTime = $.querySelector('#session-time')
const newSessionaccess = $.querySelector('.new-session_access')
let sessionAccess = 1
const newSessionCourse = $.querySelector('.new-session_course')
let sessionCourse = null
const newSessionFileInput = $.querySelector('#new-session_file-input')
let selectSessionVideo = null
const newSessionFile = $.querySelector('.new-session_file')
const newSessionFileName = $.querySelector('.new-session_file span')
const newSessionSubmit = $.querySelector('.new-session_submit')

const showSessions = $.querySelector('#show-session')


// --------------------------------------------------


// change session access
newSessionaccess.addEventListener('change', e => {
    sessionAccess = e.target.value
})

// change session course
newSessionCourse.addEventListener('change', e => {
    sessionCourse = e.target.value
})


// upload video for this session
newSessionFile.addEventListener('click', () => {
    newSessionFileInput.click()
})

newSessionFileInput.addEventListener('change', e => {
    newSessionFileName.innerHTML = `نام فایل: ${e.target.files[0].name}`
    selectSessionVideo = e.target.files[0]
})

// create new session
newSessionSubmit.addEventListener('click', async event => {
    event.preventDefault()

    const formData = new FormData(newSession)
    formData.append("title", sessionName.value.trim())
    formData.append("time", sessionTime.value.trim())
    formData.append("video", selectSessionVideo)
    formData.append("free", +sessionAccess)

    await fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
    })
})

window.addEventListener('load', () => {
    // get all course
    getCourses()
        .then(Result => {
            Result.forEach(course => {
                newSessionCourse.insertAdjacentHTML('beforeend', `
                    <option value="${course._id}">${course.name}</option>
                `)
            })
        })

    // insert sessions
    getAllSessions()
        .then(Result => {
            insertSessions(Result)
        })
})

// insert sessions to html element
const insertSessions = sessions => {
    showSessions.innerHTML = ''
    sessions.forEach(session => {
        showSessions.insertAdjacentHTML('beforeend', `
            <tr class="w100 flex between">
                <td>${session.title}</td>
                <td>${session.course ? session.course.name : 'نا معلوم'}</td>
                <td>${session.time}</td>
                <td>${session.free === 1 ? 'رایگان' : '$'}</td>
                <td>${session.createdAt.slice(0, 10)}</td>
                <td class="course-edit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd"
                            d="M2.25 21C2.25 20.5858 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 20.5858 21.75 21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21Z"
                            fill="#9090ff" />
                        <path
                            d="M7.31963 17.9881L10.7523 17.4977C11.2475 17.427 11.7064 17.1976 12.06 16.8439L18.6883 10.2156C18.6883 10.2156 17.0537 10.2156 15.419 8.58102C13.7844 6.94639 13.7844 5.31177 13.7844 5.31177L7.15616 11.94C6.80248 12.2937 6.57305 12.7526 6.50231 13.2477L6.01193 16.6804C5.90295 17.4433 6.5568 18.0971 7.31963 17.9881Z"
                            fill="#9090ff" />
                        <path opacity="0.4"
                            d="M20.3229 5.31171L18.6883 3.67708C17.7855 2.77431 16.3218 2.77431 15.4191 3.67708L13.7844 5.31171C13.7844 5.31171 13.7844 6.94634 15.419 8.58096C17.0537 10.2156 18.6883 10.2156 18.6883 10.2156L20.3229 8.58096C21.2257 7.67818 21.2257 6.21449 20.3229 5.31171Z"
                            fill="#9090ff" />
                    </svg>
                </td>
                <td class="course-delet" onclick='deleteSession(${JSON.stringify(sessions)}, ${JSON.stringify(session._id)})'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            fill="#ff9090" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.2982 15.3588C14.5911 15.6517 15.0659 15.6517 15.3588 15.3588C15.6517 15.0659 15.6517 14.591 15.3588 14.2982L13.0608 12.0001L15.3588 9.70209C15.6517 9.4092 15.6517 8.93433 15.3588 8.64143C15.0659 8.34854 14.591 8.34854 14.2982 8.64143L12.0001 10.9395L9.70198 8.6413C9.40908 8.34841 8.93421 8.34841 8.64132 8.6413C8.34842 8.93419 8.34842 9.40907 8.64132 9.70196L10.9395 12.0001L8.6413 14.2983C8.34841 14.5912 8.34841 15.0661 8.6413 15.3589C8.93419 15.6518 9.40907 15.6518 9.70196 15.3589L12.0001 13.0608L14.2982 15.3588Z"
                            fill="#ff9090" />
                    </svg>
                </td>
            </tr>
        `)
    })
}

// delete session
const deleteSession = (sessions, id) => {
    fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
    })
        .then(() => {
            const filteredSessions = sessions.filter(session => session._id !== id)
            insertSessions(filteredSessions)
        })
}

window.deleteSession = deleteSession