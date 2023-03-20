const $ = document
import { getBlogs } from "./function/utility.js"
import { showBlogs } from "./function/utility.js"
import { filterCategoey } from "./function/utility.js"
import { searchCategory } from "./function/utility.js"


// -------------------------------------------------------


const blogCategoryList = $.querySelector('.blog-category-list')
const filterCategoryBox = $.querySelectorAll('.filter-category_box')
const searchBlogs = $.querySelector('.search-box_input')


// -------------------------------------------------------


window.addEventListener('load', () => {
    getBlogs()
        .then(Result => {
            Result.forEach(item => {
                console.log(item['shortName']);
            });
            showBlogs(Result, blogCategoryList, Result.length)

            // filtering blogs
            filterCategoryBox.forEach(element => {
                element.addEventListener('click', e => {
                    console.log(e.target.dataset.filter);
                    const filterCategoeyResult = filterCategoey(Result, e.target.dataset.filter)
                    showBlogs(filterCategoeyResult, blogCategoryList, filterCategoeyResult.length)
                })
            });
            
            // search blogs
            searchBlogs.addEventListener('input', () => {
                const searchedBlogs = searchCategory(Result, 'title', searchBlogs.value)
                showBlogs(searchedBlogs, blogCategoryList, searchedBlogs.length)
            })
        })
})