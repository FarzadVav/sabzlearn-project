const $ = document
import { getCourses } from "./function/utility.js"
import { showCourses } from "./function/utility.js"
import { letterName } from "./function/utility.js"
import { getPreSellCourses } from "./function/utility.js"
import { getBlogs } from "./function/utility.js"
import { showBlogs } from "./function/utility.js"


// -----------------------------------------------------------------


const countCourses = $.querySelector('.top-landing_right_count-courses')
const countWatchTimes = $.querySelector('.top-landing_right_count-watch-times')
const countUsers = $.querySelector('.top-landing_right_count-users')
// courses
const coursesContainer = $.querySelector('.product-list')
// pre sell courses
const preSellCoursesContainer = $.querySelector('#pre-sell-courses-container')
// blogs
const blogContainer = $.querySelector('.blog-list')


// -----------------------------------------------------------------


// counter
function counter(elem, count) {
  const speed = 400;

  const animate = () => {
    const value = count;
    const data = +elem.innerText;

    const time = value / speed;
    if (data < value) {
      elem.innerText = Math.ceil(data + time);
      setTimeout(animate, 1);
    } else {
      elem.innerText = value;
    }

  }

  animate();
}

window.addEventListener('load', () => {
  counter(countCourses, 47)
  counter(countWatchTimes, 98702)
  counter(countUsers, 72401)
})

// swiper slider
const landingSwiper = new Swiper('.top-landing_swiper', {
  effect: "cards",
  grabCursor: true,

  autoplay: {
    delay: 2000
  },

  pagination: {
    el: '.top-landing_swiper_pagination',
    clickable: true,
  }
});

const swiperProduct = new Swiper('.swiper-product', {
  slidesPerView: 2,
  spaceBetween: 30,
  grabCursor: true,

  autoplay: {
    delay: 2000
  },

  breakpoints: {
    992: {
      slidesPerView: 3,
    }
  },

  pagination: {
    el: ".swiper-product_pagination",
    clickable: true,
  },
});


// -----------------------------------------------------------------


// show last courses - pre sell courses - last blogs
window.addEventListener('load', () => {
  // last courses
  getCourses()
    .then(Result => {
      showCourses(Result, coursesContainer, 6)
    })

    // pre sell courses
    getPreSellCourses()
    .then(Result => {
      for (let i = 0; i < Result.length; i++) {
        preSellCoursesContainer.insertAdjacentHTML('beforeend', `
          <div class="swiper-slide swiper-product_slide flex">
            <div class="product mx-w100">
                <img src="http://localhost:4000/courses/covers/${Result[0].cover}" alt="product" class="product-img">
                <div class="product-bottom flex column between">
                    <span class="product-bottom_category">${Result[i].categoryID}</span>
                    <a href="course.html?name=${Result[i].shortName}" class="product-bottom_name">
                      ${letterName(Result[i].name, Result[i].name.length)}
                    </a>
                    <div class="product-bottom_prices flex gap3 wrap">
                        <span class="product-bottom_prices_price">
                          ${Result[i].price ? Result[i].price.toLocaleString() : "رایگان"}
                        </span>
                    </div>
                </div>
                <div class="product-bottom_status flex between">
                    <span class="product-bottom_status_teacher">${Result[i].creator}</span>
                    <span class="product-bottom_status_users">
                        <span class="product-bottom_status_users_count">${Result[i].registers}</span> دانشجو
                    </span>
                </div>
            </div>
          </div>
        `)
      }
    })

    // last blogs
    getBlogs()
    .then(Result => {
      showBlogs(Result, blogContainer, 6)
    })
})