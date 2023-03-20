const $ = document
import { sweetAlert } from "./function/utility.js"
import { getURLParams } from "./function/utility.js"
import { getOneCourse } from "./function/utility.js"
import { postComment } from "./function/utility.js"


// --------------------------------------------------------------


// share course
const shareBtn = $.querySelector('#share-course')
const shareSection = $.querySelector('.modal-share-course')
const Qr = $.querySelector('.modal-share-course_container_Qr')
const QrLoader = $.querySelector('.Qr-loader')
const inputAddress = $.querySelector('.modal-share-course_input')
const cancelShareBtn = $.querySelector('.modal-share-course_cancel-btn')
const copyAddressBtn = $.querySelector('.modal-share-course_copy-btn')
// course infos
const courseCategory = $.querySelector('.course-info_desc_category')
const courseTitleName = $.querySelector('.course-info_desc_name-course')
const courseDesctiption = $.querySelector('.course-info_desc_text')
const courseUsersCount = $.querySelector('#course-users-count')
const courseCommentCount = $.querySelector('#course-comment-count')
const courseTimesCount = $.querySelector('#course-times-count')
const courseRegister = $.querySelector('.main-course_data_buy_link')
const courseStatus = $.querySelector('.course-complate')
const courseSupport = $.querySelector('.course-support')
const courseCalendar = $.querySelector('.course-calendar')
const courseTeacher = $.querySelector('#course-teacher')
const courseVideoIntro = $.querySelector('.course-info_intro_video')
const courseAccordionName = $.querySelector('.accordion-course_name')
const courseWrapper = $.querySelector('.course-wrapper')
// add comment
const addCommentTextarea = $.querySelector('.add-comment_textarea')
const addCommentSubmit = $.querySelector('.add-comment_submit')
// comments
const commentsWrapper = $.querySelector('#comments-wrapper')


// -------------------------------------------------------------------


function closeShareModal() {
    $.body.style.overflowY = 'scroll'
    shareSection.classList.remove('modal-share-course-active')
    copyAddressBtn.innerText = 'کپی'
}

function writeCopyAddressBtn(text, index) {
    if (index < text.length) {
        copyAddressBtn.innerHTML += text[index]
        index++
    }

    setTimeout(() => {
        writeCopyAddressBtn(text, index)
    }, 50);
}


// -------------------------------------------------------------------


shareBtn.addEventListener('click', () => {
    $.body.scrollTo(0, 0)
    $.body.style.overflowY = 'hidden'
    shareSection.classList.add('modal-share-course-active')
    Qr.setAttribute('src', `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${$.URL}`)
    inputAddress.value = $.URL

    Qr.addEventListener('load', () => {
        QrLoader.style.display = 'none'
    })
})

cancelShareBtn.addEventListener('click', () => {
    closeShareModal()
})

$.body.addEventListener('click', e => {
    if (e.target.className === 'modal-share-course modal-share-course-active') {
        closeShareModal()
    }
})

copyAddressBtn.addEventListener('click', () => {
    copyAddressBtn.innerHTML = ''
    let writeCounte = 0
    writeCopyAddressBtn('کپی شد 📎', writeCounte)
    navigator.clipboard.writeText($.URL)
})

window.addEventListener('load', () => {
    getOneCourse()
        .then(Result => {
            console.log(Result);
            const coursePrice = Result.price > 0 ? `${Result.price.toLocaleString()} تومان` : 'رایگان'
            let courseTime = 0
            if (Result.sessions.length > 0) {
                for (let i = 0; i < Result.sessions.length; i++) {
                    courseTime += Number(Result.sessions[i].time.replace(':', '.'))
                }
            }

            courseCategory.innerHTML = Result.categoryID.title
            courseTitleName.innerHTML = Result.name
            courseDesctiption.innerHTML = Result.description
            courseUsersCount.insertAdjacentHTML('afterbegin',
                Result.courseStudentsCount || 'بدون')
            courseCommentCount.insertAdjacentHTML('afterbegin',
                Result.comments.length || 'بدون')
            courseTimesCount.insertAdjacentHTML('afterbegin',
                (courseTime / 60) > 0 ? (courseTime / 60).toFixed(2) : 'صفر')
            courseTeacher.innerHTML = Result.creator.name
            courseRegister.innerHTML = Result.isUserRegisteredToThisCourse ? 'شما دانشجو دوره هستید' : `${coursePrice}`
            courseStatus.innerHTML = Result.isComplete ? 'به اتمام رسیده' : 'در حال برگزاری'
            courseSupport.innerHTML = Result.support
            courseCalendar.innerHTML = Result.updatedAt.slice(0, 10).replaceAll('-', '/')
            courseVideoIntro.setAttribute('poster', `http://localhost:4000/courses/covers/${Result.cover}`)
            courseAccordionName.innerHTML = Result.name
            courseWrapper.insertAdjacentHTML('beforeend', `
                ${
                    Result.sessions.length > 0 ?
                        Result.sessions.map((item, index) => {
                            if (item.free) {
                                return `
                                <div class="accordion-course_parts flex between w100" data-id="dont-close">
                                    <div class="accordion-course_parts_right flex gap3 p2" data-id="dont-close">
                                        <span class="accordion-course_parts_count flex" data-id="dont-close">${index + 1}</span>
                                        <a href="episode.html?name=${Result.shortName}&id=${item._id}" class="accordion-course_parts_right_download" data-id="dont-close">${item.title}</a>
                                    </div>
                                    <div class="accordion-course_parts_left flex gap3 p2" data-id="dont-close">
                                        <span class="accordion-course_parts_left_time" data-id="dont-close">${item.time}</span>
                                    </div>
                                </div>
                                `
                            }
                            else if (!item.free && !Result.isUserRegisteredToThisCourse) {
                                return `
                                <div class="accordion-course_parts flex between w100 course-forbidden" data-id="dont-close">
                                    <div class="accordion-course_parts_right flex gap3 p2" data-id="dont-close">
                                        <span class="accordion-course_parts_count flex" data-id="dont-close">${index + 1}</span>
                                        <a href="#" class="accordion-course_parts_right_download" data-id="dont-close">${item.title} - دسترسی ممنوع</a>
                                    </div>
                                    <div class="accordion-course_parts_left flex gap3 p2" data-id="dont-close">
                                        <span class="accordion-course_parts_left_time" data-id="dont-close">${item.time}</span>
                                    </div>
                                </div>
                                `
                            }
                        }).join('')
                        :
                        `
                        <div class="accordion-course_parts flex between w100" data-id="dont-close">
                            <div class="accordion-course_parts_right flex gap3 p2" data-id="dont-close">
                                <span class="accordion-course_parts_count flex" data-id="dont-close">1</span>
                                <span class="accordion-course_parts_right_download" data-id="dont-close">هنوز قسمتی آپلود نشده</span>
                            </div>
                            <div class="accordion-course_parts_left flex gap3 p2" data-id="dont-close">
                                <span class="accordion-course_parts_left_time" data-id="dont-close">بدون زمان</span>
                            </div>
                        </div>
                        `
                }
            `)

            if (Result.comments.length > 0) {
                console.log(commentsWrapper);
                Result.comments.map(comment => {
                    commentsWrapper.insertAdjacentHTML('beforeend', `
                        <section class="comment-container flex column align-end w100">
                            <div class="comment-container_card flex column align-strat p2 w100">
                                <div class="comment-container_card_user flex align-end gap2">
                                    <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g id="Iconly/Two-tone/Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="Profile" transform="translate(4.814286, 2.814476)" stroke="var(--white-color)" stroke-width="1.5">
                                                <path d="M7.17047619,12.531714 C3.30285714,12.531714 -4.08562073e-14,13.1164759 -4.08562073e-14,15.4583807 C-4.08562073e-14,17.8002854 3.28190476,18.4059997 7.17047619,18.4059997 C11.0380952,18.4059997 14.34,17.8202854 14.34,15.479333 C14.34,13.1383807 11.0590476,12.531714 7.17047619,12.531714 Z" id="Stroke-1"></path>
                                                <path d="M7.17047634,9.19142857 C9.70857158,9.19142857 11.7657144,7.13333333 11.7657144,4.5952381 C11.7657144,2.05714286 9.70857158,-5.32907052e-15 7.17047634,-5.32907052e-15 C4.6323811,-5.32907052e-15 2.574259,2.05714286 2.574259,4.5952381 C2.56571443,7.1247619 4.60952396,9.18285714 7.13809539,9.19142857 L7.17047634,9.19142857 Z" id="Stroke-3" opacity="0.400000006"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span class="comment-container_card_user_name">${comment.creator.username}</span>
                                </div>
                                <div class="comment-container_content my2">
                                    <p class="comment-container_content_text text-jus">${comment.body}</p>
                                </div>
                                <div class="comment-container_footer flex gap3">
                                    <span class="comment-container_footer_replay op05">پاسخ بدهید</span>
                                    <span class="comment-container_footer_replays op05">3 پاسخ</span>
                                </div>
                            </div>

                            ${
                                comment.answer && comment.answerContent ? 
                                `
                                    <section class="comment-container flex column align-end w100 replay">
                                        <div class="comment-container_card flex column align-strat p2 w100">
                                            <div class="comment-container_card_user flex align-end gap2">
                                                <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <g id="Iconly/Two-tone/Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                        <g id="Profile" transform="translate(4.814286, 2.814476)" stroke="var(--white-color)" stroke-width="1.5">
                                                            <path d="M7.17047619,12.531714 C3.30285714,12.531714 -4.08562073e-14,13.1164759 -4.08562073e-14,15.4583807 C-4.08562073e-14,17.8002854 3.28190476,18.4059997 7.17047619,18.4059997 C11.0380952,18.4059997 14.34,17.8202854 14.34,15.479333 C14.34,13.1383807 11.0590476,12.531714 7.17047619,12.531714 Z" id="Stroke-1"></path>
                                                            <path d="M7.17047634,9.19142857 C9.70857158,9.19142857 11.7657144,7.13333333 11.7657144,4.5952381 C11.7657144,2.05714286 9.70857158,-5.32907052e-15 7.17047634,-5.32907052e-15 C4.6323811,-5.32907052e-15 2.574259,2.05714286 2.574259,4.5952381 C2.56571443,7.1247619 4.60952396,9.18285714 7.13809539,9.19142857 L7.17047634,9.19142857 Z" id="Stroke-3" opacity="0.400000006"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                                <span class="comment-container_card_user_name">${comment.answerContent.creator.username}</span>
                                            </div>
                                            <div class="comment-container_content my2">
                                                <p class="comment-container_content_text text-jus">${comment.answerContent.body}</p>
                                            </div>
                                            <div class="comment-container_footer flex gap3">
                                                <span class="comment-container_footer_replay op05">پاسخ بدهید</span>
                                                <span class="comment-container_footer_replays op05">بدون پاسخ</span>
                                            </div>
                                        </div>
                                    </section>
                                `
                                : ''
                            }
                        </section>
                    `)
                })
            }
        })
})

addCommentSubmit.addEventListener('click', () => {
    if (addCommentTextarea.value) {
        const params = getURLParams('name')
        postComment(addCommentTextarea.value.trim(), params, 5)
        .then(Result => {
            addCommentTextarea.value = ''
            sweetAlert(
                'کامنت شما با موفقیت ثبت شد',
                'نظر شما پس از تایید ادمین نشان داده می شود',
                'success',
                'متوجه شدم'
            )
            console.log(Result)
        })
    }
})