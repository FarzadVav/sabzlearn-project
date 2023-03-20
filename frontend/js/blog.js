const $ = document
import { getOneBlogs } from "./function/utility.js"
import { getCourses } from "./function/utility.js"
import { letterName } from "./function/utility.js"


// --------------------------------------------------


const blogTitle = $.querySelector('.head-blog_right_title')
const blogDescription = $.querySelector('.head-blog_right_desc')
const blogCategory = $.querySelector('.blog-category')
const blogCreator = $.querySelector('.blog-creator')
const blogTime = $.querySelector('.blog-time')
const blogSideBar = $.querySelector('.blog-page_sidebar_courses')


// --------------------------------------------------


window.addEventListener('load', () => {
    getOneBlogs()
        .then(Result => {
            console.log(Result);
            blogTitle.innerHTML = Result.title
            blogDescription.innerHTML = Result.description
            blogCategory.innerHTML = Result.categoryID.title
            blogCreator.innerHTML = Result.creator.name
            blogTime.innerHTML = Result.createdAt.slice(0, 10)
            // product in sidebar
            getCourses()
                .then(Result => {
                    for (let i = 0; i < 3; i++) {
                        blogSideBar.insertAdjacentHTML('beforeend', `
                            <div class="blog-page_sidebar_courses_item w100 flex between gap3 text-center p1">
                                <a href="course.html?name=${Result[i].shortName}" class="blog-page_sidebar_courses_item_name">
                                    ${letterName(Result[i].name, Result[i].name.length)}
                                </a>
                                <img src="http://localhost:4000/courses/covers/${Result[0].cover}" alt="course cover" class="blog-page_sidebar_courses_item_img">
                            </div>
                        `)
                    }
                })
        })
})