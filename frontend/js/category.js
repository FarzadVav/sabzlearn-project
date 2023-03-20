const $ = document
import { getCategory } from "./function/utility.js"
import { showCourses } from "./function/utility.js"
import { filterCategoey } from "./function/utility.js"
import { searchCategory } from "./function/utility.js"


// --------------------------------------------------
const productCategoryList = $.querySelector('.product-category-list')
const filterCategoryBox = $.querySelectorAll('.filter-category_box')
const searchCourses = $.querySelector('.search-box_input')


// --------------------------------------------------


// show courses
window.addEventListener('load', () => {
    // get category
    getCategory()
    .then(Result => {
      showCourses(Result, productCategoryList, Result.length)

      // filtering courses
      filterCategoryBox.forEach(element => {
        element.addEventListener('click', e => {
          console.log(filterCategoey(Result, e.target.dataset.filter));
          const filterCategoeyResult = filterCategoey(Result, e.target.dataset.filter)
          showCourses(filterCategoeyResult, productCategoryList, filterCategoeyResult.length)
        })
      });

      // search courses
      searchCourses.addEventListener('input', e => {
        const searchCategoryResult = searchCategory(Result, 'name', e.target.value)
        showCourses(searchCategoryResult, productCategoryList, searchCategoryResult.length)
      })
    })
})