history.scrollRestoration = "auto";

// ScrollMagic 사용
const spyEls = document.querySelectorAll('section.scroll-spy')

const controller = new ScrollMagic.Controller();
spyEls.forEach(spyEl => {
    // 객체 생성
    new ScrollMagic.Scene({ // 감시할 장면 추가 및 옵션 지정
        triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
        triggerHook: 0.5 // 화면에 50% 지점에서 보여짐 여부 감시(0~1사이 지정)
        // 메소드 체이닝
    }).setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
        .addTo(controller); // 컨트롤러에 장면을 할당(필수!) - 라이브러리에서 지정한 문법으로 깊게 이해X
});


// Swiper 사용
const swiper = new Swiper('.project .swiper', {
    // 슬라이드 옵션 지정
    // direction: 'vertical', // 수직 슬라이드
    direction: 'horizontal', // 수평 슬라이드(기본값)
    loop: true, // 반복 재생 여부, 1 -> 2 -> 3 -> 1
    autoplay: { // 자동 재생 여부
        delay: 5000 // 0초마다 슬라이드 바뀜(기본값: 3000)
    },

    // 페이지네이션 옵션
    pagination: {
        el: '.project .swiper-pagination',
        clickable: true, // 사용자의 페이지네이션 요소 제어 가능 여부
    },

    // 이전/다음 슬라이드 버튼 옵션
    navigation: {
        nextEl: '.project .swiper-button-next',
        prevEl: '.project .swiper-button-prev',
    },
});

// 모달창 띄우기
const modalBtnList = document.querySelectorAll('.project .btn-modal');
const modalEl = document.querySelector('#modal');
const closeBtn = document.querySelector('#modal .btn-close');

const imageModalBtnList = document.querySelectorAll('.project .btn-image');
const imageModalEl = document.querySelector('#imageModal');
const imageCloseBtn = document.querySelector('#imageModal .btn-close');
const imageEl = document.querySelector('#imageModal img');

const swiperEls = document.querySelectorAll('.swiper');
// const modalBody = document.querySelector('#imageModal .modal-body');

// Quiz: modalBtn 누르면 모달창이 뜨고 closeBtn 누르면 닫히도록 만들기
// style 속성: js로 css 스타일을 제어할 수 있는 속성
modalBtnList.forEach((modalBtn, index) => {
    modalBtn.addEventListener('click', function () {
        modalEl.style.display = 'flex';
    })
});
function fadeClose(modal) {
    modal.classList.add('animate-fade-out');
    setTimeout(function () {
        modal.style.display = 'none';
        modal.classList.remove('animate-fade-out');
    }, 500);
}
closeBtn.addEventListener('click', function () {
    fadeClose(modalEl);
})
imageModalBtnList.forEach((imageModalBtn, index) => {
    imageModalBtn.addEventListener('click', function () {
        // modalBody.appendChild(swiperEls[index].querySelector('.swiper-wrapper:nth-child(2) img.src'));
        // imageEl.src = imageModalBtn.dataset.imageSrc;
        imageEl.src = swiperEls[index].querySelector('.swiper-wrapper .swiper-slide-active img').src;
        imageModalEl.style.display = 'flex';
    })
});
imageCloseBtn.addEventListener('click', function () {
    fadeClose(imageModalEl);
})
// 추가로 더 해볼만한 것!
// 모달 바깥 영역 클릭시 닫기
// ESC 키로  => 키보드 이벤트
// fade 애니메이션 넣기
modalEl.addEventListener('click', function (e) {
    // console.log(e.target);
    // console.log(e.currentTarget);
    fadeClose(modalEl);
})
modalEl.querySelector('.modal-content').addEventListener('click', function (e) {
    e.stopPropagation();
})
imageModalEl.addEventListener('click', function (e) {
    fadeClose(imageModalEl);
})
imageModalEl.querySelector('.modal-content').addEventListener('click', function (e) {
    e.stopPropagation();
})
document.addEventListener('keydown', function (e) {
    if (modalEl.style.display === 'flex') {
        if (e.key === 'Escape') {
            fadeClose(modalEl);
        }
    } else if (imageModalEl.style.display === 'flex') {
        if (e.key === 'Escape') {
            fadeClose(imageModalEl);
        }
    }
})

// 현재 연도 표시
// 날짜 정보를 가진 js의 Date 객체를 활용
console.log(new Date().getFullYear());
let dateYear = new Date().getFullYear();
const thisYear = document.querySelector('footer .copyrigt .this-year');
thisYear.textContent = dateYear;

// 페이지 최상단으로 이동
const toTop = document.querySelector('#to-top');
// 페이지에 스크롤 이벤트 감지를 추가!
// window: 브라우저 창 객체
window.addEventListener('scroll', function (e) {
    // console.log(this.window.scrollY); // y축 스크롤 위치
    // 페이지 스크롤 위치가
    // 500px을 넘으면 요소를 보이고, 
    // 500px을 넘지 않으면 요소 숨기기!
    if (window.scrollY > 500) {
        toTop.style.opacity = 1;
        toTop.style.transform = 'translateX(0)';
    }
    else {
        toTop.style.opacity = 0;
        toTop.style.transform = 'translateX(100px)';
    }
    // setTimeout(function () {
    //     toTop.style.opacity = 0;
    //     toTop.style.transform = 'translateX(100px)';
    // }, 3000);

})

// 모바일용 메뉴
const btnHamburger = document.querySelector('.btn-hamburger');
const navEl = document.querySelector('header nav');
const menuItems = document.querySelectorAll('header nav ul li a');

btnHamburger.addEventListener('click', function () {
    navEl.classList.toggle('active');
});
menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function () {
        navEl.classList.remove('active');
    });
});


