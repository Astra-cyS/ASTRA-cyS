alert("JavaScript يعمل ✅");/* ===============================
   المتغيرات العامة
================================ */
let xp = localStorage.getItem("xp")
    ? parseInt(localStorage.getItem("xp"))
    : 0;
const levelRequirements = {
    "Foundations": 0,
    "Networking": 50,
    "Web Security": 120
};
/* ===============================
   تحديث شريط التقدم
================================ */
function updateProgress() {
    const xpBar = document.getElementById("xp-bar");
    const xpText = document.getElementById("xp-text");

    if (xpBar && xpText) {
        xpBar.style.width = (xp % 100) + "%";
        xpText.innerText = `XP: ${xp}`;
    }
}

/* ===============================
   عرض المستويات
================================ */
function showLevels() {
    fetch("lessons.json")
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById("content");
            content.innerHTML = "<h2>Choose Level</h2>";

            Object.keys(data).forEach(level => {
                const requiredXP = levelRequirements[level] || 0;
                const locked = xp < requiredXP;

                content.innerHTML += `
                    <div class="card"
                        style="opacity:${locked ? 0.4 : 1}"
                        onclick="${
                            locked
                                ? `alert('🔒 هذا المستوى يتطلب ${requiredXP} XP')`
                                : `showLessons('${level}')`
                        }">
                        <h3>${level}</h3>
                        ${locked ? `<p>🔒 Requires ${requiredXP} XP</p>` : ""}
                    </div>
                `;
            });
        });
   /* ===============================
   عرض الدروس داخل مستوى
================================ */
function showLessons(level) {
    fetch("lessons.json")
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById("content");
            content.innerHTML = `<h2>${level}</h2>`;

            data[level].forEach((lesson, index) => {
                content.innerHTML += `
                    <div class="card" onclick="showLesson('${level}', ${index})">
                        <p>${lesson.title}</p>
                    </div>
                `;
            });
        });
}
}
/* ===============================
   عرض الدروس داخل مستوى
================================ */
function showLesson(level, lessonId) {
    fetch("lessons.json")
        .then(res => res.json())
        .then(data => {
            const lesson = data[level][lessonId];
            const content = document.getElementById("content");

            content.innerHTML = `
                <img src="${lesson.image}" style="width:100%;border-radius:12px;">
                <h2>${lesson.title}</h2>
                <p>${lesson.content}</p>
                <button onclick="showLessons('${level}')">رجوع</button>
            `;
        });
}

/* ===============================
   عرض اختبار المستوى
================================ */
function showLevelQuiz(level) {
    fetch("quiz.json")
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById("content");
            content.innerHTML = `<h2>${level} Quiz</h2>`;

            data[level].forEach((q, index) => {
                content.innerHTML += `
                    <div class="card">
                        <p>${q.question}</p>
                        ${q.options.map((opt, i) =>
                            `<button onclick="checkLevelAnswer('${level}', ${index}, ${i})">${opt}</button>`
                        ).join("")}
                    </div>
                `;
            });
        });
}

/* ===============================
   التحقق من الإجابة
================================ */
function checkLevelAnswer(level, qIndex, optIndex) {
    fetch("quiz.json")
        .then(res => res.json())
        .then(data => {
            if (optIndex === data[level][qIndex].answer) {
                xp += 10;
                localStorage.setItem("xp", xp);
                updateProgress();
                alert("✅ إجابة صحيحة +10 XP");
            } else {
                alert("❌ إجابة خاطئة");
            }
        });
}

/* ===============================
   تشغيل التطبيق
================================ */
updateProgress();
showLevels();
