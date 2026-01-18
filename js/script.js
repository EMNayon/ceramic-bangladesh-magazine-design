// 1. Initialize 3D Effect Slider
var swiper3D = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

// 2. Initialize Partner Slider (Carousel)
const partnerSwiper = new Swiper('.partnerSwiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5, spaceBetween: 30 },
    },
});

// 3. Initialize Hero Slider
var heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    effect: "fade",
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


var adSwiper = new Swiper(".myAdSwiper", {
    loop: true,               // স্লাইড শেষ হলে আবার প্রথম থেকে শুরু হবে
    autoplay: {
        delay: 3000,          // ৩ সেকেন্ড পর পর ছবি বদলাবে (সময় বাড়াতে/কমাতে পারেন)
        disableOnInteraction: false, // মাউস দিয়ে ধরলেও অটো-প্লে বন্ধ হবে না
    },
    effect: 'fade',           // ছবিগুলো স্মুথলি ফেইড হয়ে আসবে (Slide চাইলে এটা বাদ দিন)
    fadeEffect: {
        crossFade: true
    },
    allowTouchMove: false,    // মাউস দিয়ে ড্র্যাগ করা বন্ধ (যেহেতু আপনি বাটন চান না)
});

function switchFooter(targetId) {
    // ১. সব ফুটার লুকিয়ে ফেলি (hidden ক্লাস যোগ করি)
    document.querySelectorAll('.footer-variant').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });

    // ২. সিলেক্ট করা ফুটার দেখাই (block ক্লাস যোগ করি)
    const activeFooter = document.getElementById(targetId);
    if (activeFooter) {
        activeFooter.classList.remove('hidden');
        activeFooter.classList.add('block');
    }
}

// New Toggle Function (মিনিমাইজ/ম্যাক্সিমাইজ করার জন্য)
function toggleSwitcher() {
    const content = document.getElementById('switcher-content');
    const icon = document.getElementById('switcher-icon');

    // চেক করি এখন হাইট আছে কিনা
    if (content.style.maxHeight) {
        // যদি খোলা থাকে, বন্ধ করো
        content.style.maxHeight = null;
        icon.classList.remove('rotate-180'); // আইকন সোজা করো
    } else {
        // যদি বন্ধ থাকে, খোলো (স্ক্রল হাইট অনুযায়ী)
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add('rotate-180'); // আইকন উল্টাও
    }
}