const $ = document
import { getEpisode } from "./function/utility.js";


// ---------------------------------------------------------


const episodeInfoDataVideo = $.querySelector('.episode-info_data_video')
const episodeInfoDataTitle = $.querySelector('.episode-info_data_title')
const episodeInfoDataDownload = $.querySelector('.episode-info_data_download')
const episodeInfoSidebarList = $.querySelector('.episode-info_sidebar_list')


// ---------------------------------------------------------


window.addEventListener('load', () => {
    getEpisode()
        .then(Result => {
            console.log(Result);
            console.log(episodeInfoDataTitle);
            if (Result) {
                episodeInfoDataVideo.setAttribute('src', `http://localhost:4000/courses/covers/${Result.session.video}`)
                episodeInfoDataTitle.innerHTML = Result.session.title
                episodeInfoDataDownload.setAttribute('href', `http://localhost:4000/courses/covers/${Result.session.video}`)
                episodeInfoSidebarList.insertAdjacentHTML('beforeend', `
            ${Result.sessions.map(item => {
                    if (item.free) {
                        return `
                        <li class="episode-info_sidebar_item flex between w100">
                            <span class="episode-info_sidebar_link outher-episode" data-id="${item._id}">${item.title}</span>
                            <span class="episode-info_sidebar_time">${item.time}</span>
                        </li>
                        `
                    }
                    else {
                        return `
                        <li class="episode-info_sidebar_item flex between w100 course-forbidden">
                            <span class="episode-info_sidebar_link">${item.title} - دسترسی ممنوع</span>
                            <span class="episode-info_sidebar_time">${item.time}</span>
                        </li>
                        `
                    }
                }).join('')
                    }
            `)

            // outher-episode
            const outherEpisode = $.querySelectorAll('.outher-episode')
            outherEpisode.forEach(element => {
                element.addEventListener('click', e => {
                    if (e.target.dataset.id) {
                        Result.sessions.forEach(item => {
                            if (item._id === e.target.dataset.id) {
                                episodeInfoDataVideo.setAttribute('src', `http://localhost:4000/courses/covers/${item.video}`)
                                episodeInfoDataTitle.innerHTML = item.title
                                episodeInfoDataDownload.setAttribute('href', `http://localhost:4000/courses/covers/${item.video}`)
                            }
                        });
                    }
                })
            });
            }
        })
})