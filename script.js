// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyDWQ7Qs50KEuNzcmWShEc_8iBYnx_Kkmz8",
    authDomain: "pull-up-6504e.firebaseapp.com",
    databaseURL: "https://pull-up-6504e-default-rtdb.firebaseio.com",
    projectId: "pull-up-6504e",
    storageBucket: "pull-up-6504e.firebasestorage.app",
    messagingSenderId: "862460549940",
    appId: "1:862460549940:web:f5b25f0dd599b7dcbfa361",
    measurementId: "G-9YHPGFC48P"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// =========================
// 1️⃣ 로그인 기능
// =========================
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Firebase에서 사용자 데이터 가져오기
    const userRef = db.ref("users/" + username);
    userRef.once("value", (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.pw === password) {
            localStorage.setItem("loggedInUser", username);
            localStorage.setItem("role", userData.role);
            window.location.href = userData.role === "student" ? "student.html" : "teacher.html";
        } else {
            errorMessage.innerText = "아이디 또는 비밀번호가 틀렸습니다.";
        }
    });
}

// =========================
// 2️⃣ 학생 기능 - 과목 선택 & 저장
// =========================
function submitSubject() {
    const studentID = localStorage.getItem("loggedInUser");
    if (!studentID) return redirectToLogin();

    const selectedSubject = document.getElementById("subject").value;
    if (!selectedSubject) return alert("과목을 선택하세요!");

    db.ref("students/" + studentID).set({
        subject: selectedSubject,
        grade: null,
        date: null
    });

    document.getElementById("statusMessage").innerText = `선택한 과목: ${selectedSubject} (저장됨)`;
}

// =========================
// 3️⃣ 학생 기능 - 성적 조회 (실시간 반영)
// =========================
function loadStudentGrade() {
    const studentID = localStorage.getItem("loggedInUser");
    if (!studentID) return redirectToLogin();

    db.ref("students/" + studentID).on("value", (snapshot) => {
        const studentInfo = snapshot.val();
        document.getElementById("gradeResult").innerText = studentInfo && studentInfo.grade
            ? `과목: ${studentInfo.subject} | 성적: ${studentInfo.grade} | 날짜: ${studentInfo.date}`
            : "아직 성적이 입력되지 않았습니다.";
    });
}

// =========================
// 4️⃣ 선생님 기능 - 학생 목록 & 성적 입력 (실시간 반영)
// =========================
function loadStudentData() {
    db.ref("students").on("value", (snapshot) => {
        const studentData = snapshot.val() || {};
        const studentContainer = document.getElementById("studentContainer");
        studentContainer.innerHTML = "";

        for (let i = 1; i <= 13; i++) {
            let studentID = `student${i}`;
            let data = studentData[studentID] || { subject: "-", grade: "", date: "-" };

            let card = document.createElement("div");
            card.classList.add("student-card");
            card.innerHTML = `
                <h3>${studentID}</h3>
                <p><strong>과목:</strong> ${data.subject}</p>
                <p><strong>최근 성적 입력 날짜:</strong> ${data.date}</p>
                <input type="text" id="grade_${studentID}" value="${data.grade}" placeholder="성적 입력">
                <button onclick="saveGrade('${studentID}')">저장</button>
                <button onclick="deleteStudentData('${studentID}')">삭제</button>
            `;
            studentContainer.appendChild(card);
        }
    });
}

// =========================
// 5️⃣ 선생님 성적 저장 (실시간 반영)
// =========================
function saveGrade(studentID) {
    let inputGrade = document.getElementById(`grade_${studentID}`).value;

    db.ref("students/" + studentID).update({
        grade: inputGrade,
        date: new Date().toLocaleDateString()  // 현재 날짜 자동 입력
    });
}

// =========================
// 6️⃣ 선생님 학생 데이터 삭제
// =========================
function deleteStudentData(studentID) {
    db.ref("students/" + studentID).remove();
}

// =========================
// 🚀 유틸리티 함수 (로그인 체크)
// =========================
function redirectToLogin() {
    alert("로그인 정보가 없습니다. 다시 로그인하세요.");
    window.location.href = "index.html";
}
