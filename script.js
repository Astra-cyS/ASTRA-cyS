alert("JavaScript يعمل ✅");

/* ===============================
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
    const xpBar = document.getElementById("progress-bar");
    if (xpBar) {
        xpBar.style.width = (xp % 100) + "%";
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
                content.innerHTML += `
                    <div class="card" onclick="showLessons('${level}')">
                        <h3>${level}</h3>
                    </div>
                `;
            });
        });
}

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

/* ===============================
   عرض درس واحد
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
                <button onclick="showLessons('${level}')">⬅ رجوع</button>
            `;
        });
}

/* ===============================
   تشغيل التطبيق
================================ */
updateProgress();
showLevels();
