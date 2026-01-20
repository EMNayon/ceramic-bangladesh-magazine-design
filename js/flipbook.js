      // --- Configuration ---
const pdfUrl = "assets/book.pdf"; // এখানে আপনার PDF ফাইলের নাম দিন
const book = document.getElementById("book");
const scene = document.getElementById("scene");
const pageCounter = document.getElementById("page-counter");

let pages = [];
let currentPageIndex = 0;
let totalPdfPages = 0;
let currentScale = 1;

// --- Load PDF ---
pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    totalPdfPages = pdf.numPages;
    
    // Create Sheets (1 Sheet = 2 Pages)
    for (let i = 1; i <= totalPdfPages; i += 2) {
        createSheet(pdf, i, i + 1);
    }

    // 🟢 Initial State: Closed & Centered
    if (currentPageIndex === 0) {
        book.classList.add("closed");
    }

    updateUI();
    resizeBook();
}).catch(err => {
    console.error(err);
    pageCounter.innerText = "PDF Load Error";
});

// --- Responsive Resize ---
window.addEventListener('resize', resizeBook);

function resizeBook() {
    const containerWidth = document.querySelector('.scene-container').clientWidth;
    const baseWidth = containerWidth > 900 ? 900 : containerWidth - 30;
    scene.style.width = `${baseWidth}px`;
}

// --- Sheet Creation Logic ---
function createSheet(pdf, p1, p2) {
    const sheet = document.createElement("div");
    sheet.className = "page";
    sheet.style.zIndex = 1000 - pages.length; // Stack order

    const front = document.createElement("div");
    front.className = "front";
    const back = document.createElement("div");
    back.className = "back";

    sheet.appendChild(front);
    sheet.appendChild(back);
    book.appendChild(sheet);
    pages.push(sheet);

    // Render Pages
    renderPage(pdf, p1, front);
    if (p2 <= totalPdfPages) {
        renderPage(pdf, p2, back);
    } else {
        back.style.background = "#fff"; // Empty back page
    }
}

function renderPage(pdf, pageNo, container) {
    pdf.getPage(pageNo).then(page => {
        const viewport = page.getViewport({ scale: 2 }); // Scale 2 for better quality
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        container.appendChild(canvas);
        page.render({ canvasContext: ctx, viewport: viewport });
    });
}

// --- Navigation Logic (Next/Prev) ---
function goNext() {
    if (currentPageIndex < pages.length) {
        const currentSheet = pages[currentPageIndex];
        currentSheet.classList.add("flipped");
        currentSheet.style.zIndex = 1000 + currentPageIndex; // Bring to top stack
        currentPageIndex++;
        updateUI();
    }
}

function goPrev() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        const currentSheet = pages[currentPageIndex];
        currentSheet.classList.remove("flipped");
        
        // Wait for animation to finish before resetting z-index
        setTimeout(() => {
            currentSheet.style.zIndex = 1000 - currentPageIndex;
        }, 300); // Matches CSS transition time roughly
        
        updateUI();
    }
}

document.getElementById("next").onclick = goNext;
document.getElementById("prev").onclick = goPrev;

// --- 🟢 Mobile Swipe Support ---
let touchStartX = 0;
let touchEndX = 0;

scene.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
scene.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) goNext(); // Swipe Left
    if (touchEndX > touchStartX + 50) goPrev(); // Swipe Right
});

// --- UI Updates & Centering Logic ---
function updateUI() {
    // 🟢 Smart Centering Logic
    if (currentPageIndex === 0) {
        book.classList.add("closed"); // Center the cover
    } else {
        book.classList.remove("closed"); // Shift right for open book
    }

    // Button Visibility
    document.getElementById("prev").style.opacity = currentPageIndex === 0 ? '0' : '1';
    document.getElementById("prev").style.pointerEvents = currentPageIndex === 0 ? 'none' : 'auto';
    
    document.getElementById("next").style.opacity = currentPageIndex === pages.length ? '0' : '1';
    document.getElementById("next").style.pointerEvents = currentPageIndex === pages.length ? 'none' : 'auto';

    // Page Counter Text
    let leftPage = currentPageIndex * 2;
    let rightPage = leftPage + 1;
    let text = "";
    
    if (currentPageIndex === 0) text = `Cover`;
    else if (rightPage > totalPdfPages) text = `Page ${leftPage} / ${totalPdfPages}`;
    else text = `Pages ${leftPage}-${rightPage}`;
    
    pageCounter.innerText = text;
}

// --- Toolbar Controls ---
document.getElementById("zoom-in").onclick = () => {
    if (currentScale < 1.8) { currentScale += 0.2; applyZoom(); }
};
document.getElementById("zoom-out").onclick = () => {
    if (currentScale > 0.6) { currentScale -= 0.2; applyZoom(); }
};
function applyZoom() { scene.style.transform = `scale(${currentScale})`; }

document.getElementById("fullscreen-btn").onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
};