// document.getElementById('current-date').textContent = new Date().toLocaleDateString();
const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
};
const todayDate = new Date().toLocaleDateString("en-US", dateOptions);
const desktopDateElement = document.getElementById("current-date");
if (desktopDateElement) {
    desktopDateElement.textContent = todayDate;
}
const mobileDateElement = document.getElementById("mobile-date");
if (mobileDateElement) {
    mobileDateElement.textContent = todayDate;
}

var adSwiper = new Swiper(".myAdSwiper", {
    loop: true,
    autoplay: { delay: 3000 },
    effect: "fade",
    allowTouchMove: false,
});

// ==========================================
// 🛠 FIX: HEADER LAYOUT LOGIC
// ==========================================
function setHeaderLayout(type) {
    const container = document.getElementById("header-container");
    const logoWrapper = document.getElementById("main-logo-wrapper");
    const adsWrapper = document.getElementById("header-ads-wrapper");

    if (type === "center") {
        // --- HIDE ADS ---
        // 1. md:block সরিয়ে দিচ্ছি যাতে hidden কাজ করে
        adsWrapper.classList.remove("md:block");
        adsWrapper.classList.add("hidden");

        // 2. লোগো সেন্টারে আনা
        container.classList.remove("justify-between");
        container.classList.add("justify-center");

        logoWrapper.classList.remove("w-1/3", "justify-start");
        // w-auto দিলে ফ্লেক্সবক্সে ঠিক মাঝখানে আসবে
        logoWrapper.classList.add("w-auto", "justify-center");
    } else {
        // --- SHOW ADS ---
        // 1. hidden সরিয়ে md:block ফেরত আনা
        adsWrapper.classList.remove("hidden");
        adsWrapper.classList.add("md:block");

        // 2. লেআউট রিসেট করা
        container.classList.remove("justify-center");
        container.classList.add("justify-between");

        logoWrapper.classList.remove("w-auto", "justify-center");
        logoWrapper.classList.add("w-1/3", "justify-start");
    }
}

// SCROLL & MENU LOGIC
const stickyNav = document.getElementById("sticky-nav");
const stickyLogo = document.getElementById("sticky-logo");
const desktopMenu = document.getElementById("desktop-menu");
const hamburgerBtn = document.getElementById("hamburger-btn");
const drawer = document.getElementById("side-drawer");
const overlay = document.getElementById("mobile-menu-overlay");

window.addEventListener("scroll", () => {
    if (window.scrollY > 160) {
        stickyLogo.classList.remove("hidden");
        setTimeout(() => stickyLogo.classList.remove("opacity-0"), 10);
        desktopMenu.classList.add("hidden");
        hamburgerBtn.classList.remove("hidden");
    } else {
        stickyLogo.classList.add("opacity-0");
        stickyLogo.classList.add("hidden");
        desktopMenu.classList.remove("hidden");
        hamburgerBtn.classList.add("hidden");
    }
});

function toggleMenu() {
    if (drawer.classList.contains("translate-x-full")) {
        drawer.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
    } else {
        drawer.classList.add("translate-x-full");
        overlay.classList.add("hidden");
    }
}

// SEARCH OVERLAY FUNCTIONALITY
const searchOverlay = document.getElementById("search-overlay");
const searchContainer = document.getElementById("search-container");
const searchInput = searchOverlay.querySelector("input");

function openSearch() {
    // 1. Show Overlay
    searchOverlay.classList.remove("opacity-0", "invisible");
    searchOverlay.classList.add("opacity-100", "visible");

    // 2. Scale Up Animation for Container
    searchContainer.classList.remove("scale-95");
    searchContainer.classList.add("scale-100");

    // 3. Prevent Body Scroll
    document.body.style.overflow = "hidden";

    // 4. Focus Input automatically after a slight delay
    setTimeout(() => {
        searchInput.focus();
    }, 100);
}

function closeSearch() {
    // 1. Hide Overlay
    searchOverlay.classList.remove("opacity-100", "visible");
    searchOverlay.classList.add("opacity-0", "invisible");

    // 2. Scale Down Animation
    searchContainer.classList.remove("scale-100");
    searchContainer.classList.add("scale-95");

    // 3. Restore Body Scroll
    document.body.style.overflow = "auto";
}

// Close on ESC Key Press
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeSearch();
    }
});

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
const partnerSwiper = new Swiper(".partnerSwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
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
    loop: true, // স্লাইড শেষ হলে আবার প্রথম থেকে শুরু হবে
    autoplay: {
        delay: 3000, // ৩ সেকেন্ড পর পর ছবি বদলাবে (সময় বাড়াতে/কমাতে পারেন)
        disableOnInteraction: false, // মাউস দিয়ে ধরলেও অটো-প্লে বন্ধ হবে না
    },
    effect: "fade", // ছবিগুলো স্মুথলি ফেইড হয়ে আসবে (Slide চাইলে এটা বাদ দিন)
    fadeEffect: {
        crossFade: true,
    },
    allowTouchMove: false, // মাউস দিয়ে ড্র্যাগ করা বন্ধ (যেহেতু আপনি বাটন চান না)
});

function switchFooter(targetId) {
    // ১. সব ফুটার লুকিয়ে ফেলি (hidden ক্লাস যোগ করি)
    document.querySelectorAll(".footer-variant").forEach((el) => {
        el.classList.add("hidden");
        el.classList.remove("block");
    });

    // ২. সিলেক্ট করা ফুটার দেখাই (block ক্লাস যোগ করি)
    const activeFooter = document.getElementById(targetId);
    if (activeFooter) {
        activeFooter.classList.remove("hidden");
        activeFooter.classList.add("block");
    }
}

// New Toggle Function (মিনিমাইজ/ম্যাক্সিমাইজ করার জন্য)
function toggleSwitcher() {
    const content = document.getElementById("switcher-content");
    const icon = document.getElementById("switcher-icon");

    // চেক করি এখন হাইট আছে কিনা
    if (content.style.maxHeight) {
        // যদি খোলা থাকে, বন্ধ করো
        content.style.maxHeight = null;
        icon.classList.remove("rotate-180"); // আইকন সোজা করো
    } else {
        // যদি বন্ধ থাকে, খোলো (স্ক্রল হাইট অনুযায়ী)
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-180"); // আইকন উল্টাও
    }
}


function toggleSettings() {
    const content = document.getElementById('settings-content');
    const icon = document.getElementById('settings-icon');

    if (content.style.maxHeight) {
        // Close
        content.style.maxHeight = null;
        icon.classList.remove('rotate-180');
    } else {
        // Open (Auto height based on content)
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add('rotate-180');
    }
}