const text = "데이터 멀티태스커 포트폴리오"; // 타이핑할 텍스트
const typingSpeed = 200; // 타이핑 속도 (밀리초)
let index = 0; // 타이핑할 텍스트의 인덱스
let typingEffectElement = document.getElementById("typingEffect");

function typeText() {
    if (index < text.length) {
        document.getElementById("typingEffect").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed); // 다음 글자를 타이핑하도록 대기
    }
}


// 페이지 로드 시 타이핑 효과 시작
window.onload = function() {
    typeText();
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
        const headerOffset = window.innerHeight * 0.2; // 10vh에 해당하는 오프셋
        const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY; // 스크롤 위치와 섹션 위치 계산
        const offsetPosition = elementPosition - headerOffset;

        // 부드럽게 스크롤 이동
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});


function resetTypingEffect() {
    index = 0;
    typingEffectElement.innerHTML = ''; // 기존 텍스트 초기화
    typeText(); // 타이핑 효과 재실행
}

// a 태그 클릭 이벤트로 타이핑 효과 다시 실행
document.getElementById("startTyping").onclick = function(event) {
    resetTypingEffect(); // 타이핑 효과 초기화 및 다시 실행
};
