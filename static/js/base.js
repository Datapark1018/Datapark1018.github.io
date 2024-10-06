const text = "데이터 분석가 포트폴리오<br>Bak Sung Ho"; // 타이핑할 텍스트
const typingSpeed = 200; // 타이핑 속도 (밀리초)
let index = 0; // 타이핑할 텍스트의 인덱스
let typingEffectElement = document.getElementById("typingEffect");

function typeText() {
    if (index < text.length) {
        // '<br>' 태그 처리하기 위한 조건
        if (text.substring(index, index + 4) === "<br>") {
            typingEffectElement.innerHTML += "<br>";
            index += 4; // '<br>' 태그는 4글자이므로 인덱스를 4 증가
        } else {
            typingEffectElement.innerHTML += text.charAt(index);
            index++;
        }
        setTimeout(typeText, typingSpeed); // 다음 글자를 타이핑하도록 대기
    }
}

typeText(); // 함수 호출

// 타이핑 효과 리셋 함수
function resetTypingEffect() {
    index = 0;
    typingEffectElement.innerHTML = ''; // 기존 텍스트 초기화
    typeText(); // 타이핑 효과 재실행
}

// a 태그 클릭 이벤트로 타이핑 효과 다시 실행
document.getElementById("startTyping").onclick = function(event) {
    resetTypingEffect(); // 타이핑 효과 초기화 및 다시 실행
};






window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
        if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));
        const headerOffset = window.innerHeight * 0.08; // 10vh에 해당하는 오프셋
        const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY; // 스크롤 위치와 섹션 위치 계산
        const offsetPosition = elementPosition - headerOffset;

        // 부드럽게 스크롤 이동
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});










// 각 id와 마크다운 파일 경로를 연결하는 배열
const markdownFiles = [
    { id: 'markdown-about', file: './static/md/about.md' },
    { id: 'career-1', file: './static/md/career1.md' },
    { id: 'career-2', file: './static/md/career2.md' },
    { id: 'markdown-content-1', file: './static/md/project1.md' },
    { id: 'markdown-content-2', file: './static/md/project2.md' },
    { id: 'markdown-content-3', file: './static/md/project3.md' }
    // { id: 'markdown-content-4', file: './static/md/project4.md' }
];

// 각 id에 해당하는 마크다운 파일을 로드하는 함수
function loadMarkdown(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            document.getElementById(id).innerHTML = marked.parse(text);
        })
        .catch(error => {
            console.error(`Error loading ${file}:`, error);
        });
}

// 모든 마크다운 파일을 로드
markdownFiles.forEach(item => {
    loadMarkdown(item.id, item.file);
});










// PDF 모달 관련 요소
const pdfModal = document.getElementById("pdfModal");
const pdfViewer = document.getElementById("pdfViewer");
const openPdfModalBtn = document.getElementById("openPdf");
const pdfCloseBtn = pdfModal.querySelector(".close");

// Markdown 모달 관련 요소
const markdownModal = document.getElementById("markdownModal");
const markdownContent = document.getElementById("markdownContent");
const openMarkdownModalBtn = document.querySelectorAll("#openMd");
const markdownCloseBtn = markdownModal.querySelector(".close");

// PDF 모달 열기
openPdfModalBtn.onclick = function () {
    const pdfSrc = "./static/misc/" + this.getAttribute('data-src');
    pdfViewer.src = pdfSrc; // PDF 파일 경로 설정
    pdfModal.style.display = "block";
};

// PDF 모달 닫기
pdfCloseBtn.onclick = function () {
    pdfModal.style.display = "none";
    pdfViewer.src = ""; // 모달을 닫을 때 PDF 경로 초기화
};


// Markdown 모달 열기
openMarkdownModalBtn.forEach(button => {
    button.onclick = function(){
        const mdSrc = "./static/md/" +this.getAttribute('data-src');
        fetch(mdSrc) // Markdown 파일 경로 설정
            .then(response => response.text())
            .then(text => {
                markdownContent.innerHTML = marked.parse(text); // 마크다운을 HTML로 변환
                markdownModal.style.display = "block"; // 모달 열기
            });
    };
});

openMarkdownModalBtn.onclick = function () {
    const mdSrc = "./static/md/" +this.getAttribute('data-src');
    fetch(mdSrc) // Markdown 파일 경로 설정
        .then(response => response.text())
        .then(text => {
            markdownContent.innerHTML = marked.parse(text); // 마크다운을 HTML로 변환
            markdownModal.style.display = "block"; // 모달 열기
        });
};

// Markdown 모달 닫기
markdownCloseBtn.onclick = function () {
    markdownModal.style.display = "none";
    markdownContent.innerHTML = ""; // 모달을 닫을 때 컨텐츠 초기화
};

// 모달 외부 클릭 시 닫기 (PDF와 Markdown 모두 적용)
window.onclick = function (event) {
    if (event.target == pdfModal) {
        pdfModal.style.display = "none";
        pdfViewer.src = "";
    }
    if (event.target == markdownModal) {
        markdownModal.style.display = "none";
        markdownContent.innerHTML = "";
    }
};