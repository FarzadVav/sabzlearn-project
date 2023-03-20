const $ = document
import { adminInfo } from "./function/utility.js"
import { getToken } from "../function/utility.js"


// -------------------------------------------


const notificationsList = $.querySelector('.notifications-list')


// -------------------------------------------


window.addEventListener('load', () => {
    adminInfo()
        .then(Admin => {
            if (Admin.notifications.length > 0) {
                insertNotifications(Admin.notifications)
            }
            else {
                notificationsList.insertAdjacentHTML('beforebegin', `
                    <div class="w100 flex between p2">
                        <h1 class="notifications-title">پیغامی برای شما وجود ندارد</h1>
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                d="M6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2Z"
                                fill="#efefef" />
                            <path
                                d="M17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10Z"
                                fill="#efefef" />
                            <path
                                d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z"
                                fill="#efefef" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.5054 16.5638C14.8151 16.8355 15.2865 16.8066 15.5605 16.4983C15.8357 16.1887 15.8079 15.7146 15.4983 15.4394L15 16C15.4983 15.4394 15.4985 15.4396 15.4983 15.4394L15.4973 15.4386L15.4962 15.4376L15.4938 15.4355L15.4876 15.4301L15.47 15.4151C15.456 15.4033 15.4375 15.388 15.4145 15.3697C15.3685 15.3332 15.3045 15.2846 15.2232 15.2281C15.0609 15.1151 14.828 14.9694 14.5303 14.8251C13.935 14.5365 13.0732 14.25 12 14.25C10.9267 14.25 10.065 14.5365 9.46966 14.8251C9.17202 14.9694 8.9391 15.1151 8.77677 15.2281C8.69548 15.2846 8.63149 15.3332 8.58551 15.3697C8.5625 15.388 8.54397 15.4033 8.52998 15.4151L8.51242 15.4301L8.50621 15.4355L8.50375 15.4376L8.50268 15.4386C8.50244 15.4388 8.50172 15.4394 8.99999 16L8.50172 15.4394C8.19213 15.7146 8.16425 16.1887 8.43944 16.4983C8.71352 16.8066 9.18489 16.8355 9.49455 16.5638L9.49542 16.5631C9.49883 16.5602 9.50706 16.5534 9.51848 16.5443C9.54135 16.5261 9.57989 16.4966 9.63337 16.4594C9.74057 16.3848 9.90609 16.2805 10.1241 16.1749C10.56 15.9635 11.1982 15.75 12 15.75C12.8017 15.75 13.44 15.9635 13.8759 16.1749C14.0939 16.2805 14.2594 16.3848 14.3666 16.4594C14.4201 16.4966 14.4586 16.5261 14.4815 16.5443C14.4929 16.5534 14.5004 16.5596 14.5038 16.5624C14.5045 16.5631 14.5051 16.5635 14.5054 16.5638C14.5055 16.5638 14.5054 16.5638 14.5054 16.5638ZM9.49455 16.5638L9.49542 16.5631L9.49665 16.562L9.49741 16.5613C9.49632 16.5623 9.49564 16.5629 9.49455 16.5638Z"
                                fill="#efefef" />
                        </svg>
                    </div>
                `)
            }
        })
})

// insert notifications to html element
const insertNotifications = (notifications) => {
    notificationsList.innerHTML = ''
    notifications.forEach(notification => {
        notificationsList.insertAdjacentHTML('beforeend', `
            <li class="notifications_item w100 flex between p2">
                <div class="flex gap3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.4"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            fill="#ffaaaa" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V9C12.75 9.41421 12.4142 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 10.75C12.4142 10.75 12.75 11.0858 12.75 11.5V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V11.5C11.25 11.0858 11.5858 10.75 12 10.75Z"
                            fill="#ffaaaa" />
                    </svg>
                    <span>${notification.msg}</span>
                </div>
                <span class="pointer" onclick='seenNotifications(${JSON.stringify(notification._id)}, ${JSON.stringify(notifications)})'>دیدم!</span>
            </li>
        `)
    })
}

// seen notifications
const seenNotifications = async (id, notifications) => {
    const Response = await fetch(`http://localhost:4000/v1/notifications/see/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` }
    })
    const Result = await Response.json()

    const filteredNtifications = notifications.filter(notification => notification._id !== id)
    insertNotifications(filteredNtifications)
}

window.seenNotifications = seenNotifications