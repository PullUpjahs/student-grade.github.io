// ============================
// 1️⃣ 로그인 기능 (13명 학생, 3명 선생)
// ============================
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const users = {
        student1: { pw: "1234", role: "student" },
        student2: { pw: "1234", role: "student" },
        student3: { pw: "1234", role: "student" },
        student4: { pw: "1234", role: "student" },
        student5: { pw: "1234", role: "student" },
        student6: { pw: "1234", role: "student" },
        student7: { pw: "1234", role: "student" },
        student8: { pw: "1234", role: "student" },
        student9: { pw: "1234", role: "student" },
        student10: { pw: "1234", role: "student" },
        student11: { pw: "1234", role: "student" },
        student12: { pw: "1234", role: "student" },
        student13: { pw: "1234", role: "student" },
        teacher1: { pw: "5678", role: "teacher" },
        teacher2: { pw: "5678", role: "teacher" },
        teacher3: { pw: "5678", role: "teacher" }
    };

    if (users[username] && password === users[username].pw) {
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("role", users[username].role);
        window.location.href = users[username].role === "student" ? "student.html" : "teacher.html";
    } else {
        errorMessage.innerText = "아이디 또는 비밀번호가 틀렸습니다.";
    }
}

// ============================
// 2️⃣ 학생 기능 - 과목 선택 & 저장
// ============================
function submitSubject() {
    const studentID = localStorage.getItem("loggedInUser");
    if (!studentID) {
        alert("로그인 정보가 없습니다. 다시 로그인하세요.");
        window.location.href = "index.html";
        return;
    }

    const selectedSubject = document.getElementById("subject").value;
    if (!selectedSubject) {
        alert("과목을 선택하세요!");
        return;
    }

    let studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    studentData[studentID] = { subject: selectedSubject, grade: null, date: null };
    localStorage.setItem("studentData", JSON.stringify(studentData));

    document.getElementById("statusMessage").innerText = `선택한 과목: ${selectedSubject} (저장됨)`;
}

// ============================
// 3️⃣ 학생 기능 - 성적 조회
// ============================
function loadStudentGrade() {
    const studentID = localStorage.getItem("loggedInUser");
    if (!studentID) {
        alert("로그인 정보가 없습니다.");
        window.location.href = "index.html";
        return;
    }

    const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    const studentInfo = studentData[studentID];

    if (studentInfo && studentInfo.grade) {
        document.getElementById("gradeResult").innerText = `과목: ${studentInfo.subject} | 성적: ${studentInfo.grade} | 날짜: ${studentInfo.date}`;
    } else {
        document.getElementById("gradeResult").innerText = "아직 성적이 입력되지 않았습니다.";
    }
}

// ============================
// 4️⃣ 선생님 기능 - 학생 목록 불러오기 & 성적 입력
// ============================
function loadStudentData() {
    const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    const studentContainer = document.getElementById("studentContainer");

    if (!studentContainer) return;
    studentContainer.innerHTML = ""; // 기존 데이터 초기화

    for (let i = 1; i <= 13; i++) {
        let studentID = `student${i}`;
        let subject = studentData[studentID] ? studentData[studentID].subject : "-";
        let grade = studentData[studentID] && studentData[studentID].grade ? studentData[studentID].grade : "";
        let date = studentData[studentID] && studentData[studentID].date ? studentData[studentID].date : "-";

        let card = document.createElement("div");
        card.classList.add("student-card"); // 스타일 적용

        card.innerHTML = `
            <h3>${studentID}</h3>
            <p><strong>과목:</strong> ${subject}</p>
            <p><strong>최근 성적 입력 날짜:</strong> ${date}</p>
            <input type="text" id="grade_${studentID}" value="${grade}" placeholder="성적 입력">
            <button onclick="saveGrade('${studentID}')">저장</button>
            <button onclick="deleteStudentData('${studentID}')">삭제</button>
        `;

        studentContainer.appendChild(card);
    }
}

// ============================
// 5️⃣ 선생님 기능 - 성적 저장
// ============================
function saveGrade(studentID) {
    let studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    let inputGrade = document.getElementById(`grade_${studentID}`).value;

    if (studentData[studentID]) {
        const currentDate = new Date().toLocaleDateString(); // 오늘 날짜 가져오기
        studentData[studentID].grade = inputGrade;
        studentData[studentID].date = currentDate; // 날짜 추가
        localStorage.setItem("studentData", JSON.stringify(studentData));
        loadStudentData(); // 새로고침
    }
}

// ============================
// 6️⃣ 선생님 기능 - 학생 데이터 삭제
// ============================
function deleteStudentData(studentID) {
    let studentData = JSON.parse(localStorage.getItem("studentData")) || {};

    if (studentData[studentID]) {
        delete studentData[studentID];
        localStorage.setItem("studentData", JSON.stringify(studentData));
        loadStudentData(); // 새로고침
    }
}

// ============================
// 7️⃣ UI 기능 - 탭 전환 (학생 페이지에서)
// ============================
function showTab(tabId) {
    document.getElementById("subjectTab").style.display = "none";
    document.getElementById("gradeTab").style.display = "none";
    document.getElementById(tabId).style.display = "block";
}

// ============================
// 8️⃣ 실시간 업데이트 (자동 새로고침)
// ============================
if (document.getElementById("studentContainer")) {
    setInterval(loadStudentData, 20000); // 선생님 페이지 자동 업데이트
}
if (document.getElementById("gradeResult")) {
    setInterval(loadStudentGrade, 2000); // 학생 페이지 자동 업데이트
}
