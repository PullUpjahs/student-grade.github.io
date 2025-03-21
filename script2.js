/// ============================
// 1️⃣ 성적 역사 관리 기능
// ============================
function saveGradeHistory(studentID, grade) {
    let studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    const currentDate = new Date().toLocaleDateString(); // 오늘 날짜 가져오기

    // 학생의 성적 기록이 없다면 초기화
    if (!studentData[studentID]) {
        studentData[studentID] = {
            subject: null,
            grade: null,
            date: null,
            gradeHistory: [] // 성적 역사 배열
        };
    }

    // 성적 기록 추가
    studentData[studentID].gradeHistory.push({ grade, date: currentDate });
    localStorage.setItem("studentData", JSON.stringify(studentData));
}

// ============================
// 2️⃣ 학생 페이지 - 성적 역사 조회
// ============================
function loadGradeHistory() {
    const studentID = localStorage.getItem("loggedInUser");
    if (!studentID) {
        alert("로그인 정보가 없습니다.");
        window.location.href = "index.html";
        return;
    }

    const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    const studentInfo = studentData[studentID];

    if (studentInfo && studentInfo.gradeHistory && studentInfo.gradeHistory.length > 0) {
        const historyContainer = document.getElementById("gradeHistoryContainer");
        historyContainer.innerHTML = ""; // 기존 내용 지우기

        studentInfo.gradeHistory.forEach((record, index) => {
            const recordDiv = document.createElement("div");
            recordDiv.classList.add("history-record");
            recordDiv.innerHTML = `
                <p><strong>성적 ${index + 1}:</strong> ${record.grade} | 날짜: ${record.date}</p>
            `;
            historyContainer.appendChild(recordDiv);
        });
    } else {
        document.getElementById("gradeHistoryContainer").innerText = "성적 기록이 없습니다.";
    }
}

// ============================
// 3️⃣ 선생님 페이지 - 학생 성적 역사 조회
// ============================
function loadStudentGradeHistory() {
    const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    const studentContainer = document.getElementById("studentContainer");

    if (!studentContainer) return;
    studentContainer.innerHTML = ""; // 기존 데이터 초기화

    for (let i = 1; i <= 13; i++) {
        let studentID = `student${i}`;
        let subject = studentData[studentID] ? studentData[studentID].subject : "-";
        let grade = studentData[studentID] && studentData[studentID].grade ? studentData[studentID].grade : "";
        let date = studentData[studentID] && studentData[studentID].date ? studentData[studentID].date : "-";
        let gradeHistory = studentData[studentID] && studentData[studentID].gradeHistory ? studentData[studentID].gradeHistory : [];

        let card = document.createElement("div");
        card.classList.add("student-card");

        card.innerHTML = `
            <h3>${studentID}</h3>
            <p><strong>과목:</strong> ${subject}</p>
            <p><strong>최근 성적 입력 날짜:</strong> ${date}</p>
            <button onclick="showGradeHistory('${studentID}')">성적 기록 보기</button>
        `;

        studentContainer.appendChild(card);
    }
}

// ============================
// 4️⃣ 성적 기록 보기 (선생님 페이지에서)
// ============================
function showGradeHistory(studentID) {
    const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    const studentInfo = studentData[studentID];
    
    if (studentInfo && studentInfo.gradeHistory && studentInfo.gradeHistory.length > 0) {
        let historyContainer = document.getElementById("studentGradeHistoryContainer");
        historyContainer.innerHTML = ""; // 기존 내용 지우기

        studentInfo.gradeHistory.forEach((record, index) => {
            let recordDiv = document.createElement("div");
            recordDiv.classList.add("history-record");
            recordDiv.innerHTML = `
                <p><strong>성적 ${index + 1}:</strong> ${record.grade} | 날짜: ${record.date}</p>
            `;
            historyContainer.appendChild(recordDiv);
        });

        document.getElementById("gradeHistoryModal").style.display = "block"; // 팝업 열기
    } else {
        alert("성적 기록이 없습니다.");
    }
}

// ============================
// 5️⃣ 성적 기록 모달 닫기
// ============================
function closeGradeHistoryModal() {
    document.getElementById("gradeHistoryModal").style.display = "none"; // 팝업 닫기
}
