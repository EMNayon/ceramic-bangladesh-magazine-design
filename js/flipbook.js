const pdfUrl = "assets/book.pdf"; // আপনার PDF ফাইলের নাম
const book = document.getElementById("book");
const scene = document.getElementById("scene");
const pageCounter = document.getElementById("page-counter");

let pages = [];
let currentPageIndex = 0;
let totalPdfPages = 0;
let currentScale = 1; // বর্তমান জুম লেভেল

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    totalPdfPages = pdf.numPages;
    for (let i = 1; i <= totalPdfPages; i += 2) {
        createSheet(pdf, i, i + 1);
    }
    updateUI(); // লোড হওয়ার পর UI আপডেট
}).catch(err => {
    alert("PDF লোড হয়নি। ফাইলের নাম চেক করুন।");
    pageCounter.innerText = "Error";
});

function createSheet(pdf, p1, p2) {
    const sheet = document.createElement("div");
    sheet.className = "page";
    sheet.style.zIndex = 1000 - pages.length;

    const front = document.createElement("div");
    front.className = "front";

    const back = document.createElement("div");
    back.className = "back";

    sheet.appendChild(front);
    sheet.appendChild(back);
    book.appendChild(sheet);

    pages.push(sheet);

    renderPage(pdf, p1, front);
    if (p2 && p2 <= totalPdfPages) {
        renderPage(pdf, p2, back);
    }
}

function renderPage(pdf, pageNo, container) {
    pdf.getPage(pageNo).then(page => {
        // স্কেল বাড়িয়ে দিলে জুম করলেও লেখা ফাটবে না
        const viewport = page.getViewport({ scale: 3 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        container.appendChild(canvas);

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

// --- Navigation Controls ---
document.getElementById("next").onclick = () => {
    if (currentPageIndex < pages.length) {
        const currentSheet = pages[currentPageIndex];
        currentSheet.classList.add("flipped");
        currentSheet.style.zIndex = 1000 + currentPageIndex;
        currentPageIndex++;
        updateUI();
    }
};

document.getElementById("prev").onclick = () => {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        const currentSheet = pages[currentPageIndex];
        currentSheet.classList.remove("flipped");
        setTimeout(() => {
            currentSheet.style.zIndex = 1000 - currentPageIndex;
        }, 500);
        updateUI();
    }
};

// --- 🟢 নতুন ফিচার কন্ট্রোল (New Feature Controls) ---

// ১. UI আপডেট ফাংশন (বাটন এবং পেজ কাউন্টার)
function updateUI() {
    // বাটন লুকানো/দেখানো
    document.getElementById("prev").style.display = currentPageIndex === 0 ? 'none' : 'flex';
    document.getElementById("next").style.display = currentPageIndex === pages.length ? 'none' : 'flex';

    // পেজ কাউন্টার আপডেট (হিসাব: বর্তমান ডান পাশের পৃষ্ঠা / মোট পৃষ্ঠা)
    let currentRightPage = (currentPageIndex * 2) + 1;
    if (currentRightPage > totalPdfPages) currentRightPage = totalPdfPages;

    // যদি প্রথম পেজে থাকি, তাহলে ১ দেখাবে, নাহলে ডান পাশের পেজ নম্বর দেখাবে
    let displayPage = currentPageIndex === 0 ? 1 : currentRightPage;

    if (totalPdfPages > 0) {
        pageCounter.innerText = `${displayPage} / ${totalPdfPages}`;
    }
}

// ২. জুম কন্ট্রোল
document.getElementById("zoom-in").onclick = () => {
    if (currentScale < 2) { // সর্বোচ্চ ২ গুন জুম
        currentScale += 0.2;
        scene.style.transform = `scale(${currentScale})`;
    }
};

document.getElementById("zoom-out").onclick = () => {
    if (currentScale > 0.6) { // সর্বনিম্ন ০.৬ গুন জুম আউট
        currentScale -= 0.2;
        scene.style.transform = `scale(${currentScale})`;
    }
};

// ৩. ফুলস্ক্রিন কন্ট্রোল
const fullscreenBtn = document.getElementById("fullscreen-btn");
fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>'; // আইকন পরিবর্তন
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; // আইকন আগের মতো
    }
};