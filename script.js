let semesterCount = 1; // Initialize semester count

// Function to add a new semester
function addSemester() {
    semesterCount++;
    const semesterContainer = document.getElementById('semesters-container');
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'semester shadow p-4 mb-5 bg-white rounded position-relative';
    semesterDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-4">Semester ${semesterCount}</h3>
            <button class="btn btn-link text-danger" onclick="confirmRemoveSemester(${semesterCount})"><i class="fas fa-trash"></i></button>
        </div>
        <div id="classes-container-${semesterCount}" class="classes-container">
            <div class="class-item form-row align-items-end mb-3">
                <div class="col-md-4 mb-3">
                    <label for="class-name-${semesterCount}-1">Class Name</label>
                    <input type="text" class="form-control" id="class-name-${semesterCount}-1" placeholder="Enter class name">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-grade-${semesterCount}-1">Class Grade</label>
                    <select class="form-control" id="class-grade-${semesterCount}-1">
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-type-${semesterCount}-1">Class Type</label>
                    <select class="form-control" id="class-type-${semesterCount}-1">
                        <option value="Regular">Regular</option>
                        <option value="Honors">Honors</option>
                        <option value="AP">AP</option>
                    </select>
                </div>
                <div class="col-md-2 mb-3 text-center">
                    <button class="btn btn-outline-danger" onclick="removeClass(this)"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-secondary" onclick="addClass(${semesterCount})"><i class="fas fa-plus"></i> Add Class</button>
            <button class="btn btn-outline-info" onclick="calculateSemesterGPA(${semesterCount})"><i class="fas fa-calculator"></i> Calculate Semester GPA</button>
        </div>
        <div class="text-center mt-2">
            <button class="btn btn-link text-secondary" onclick="confirmClearSemester(${semesterCount})"><i class="fas fa-eraser"></i> Clear Semester</button>
        </div>
    `;
    semesterContainer.appendChild(semesterDiv);
}

// Function to add a new class
function addClass(semesterId) {
    const classesContainer = document.getElementById(`classes-container-${semesterId}`);
    const classCount = classesContainer.querySelectorAll('.class-item').length + 1;
    const classItem = document.createElement('div');
    classItem.className = 'class-item form-row align-items-end mb-3';
    classItem.innerHTML = `
        <div class="col-md-4 mb-3">
            <label for="class-name-${semesterId}-${classCount}">Class Name</label>
            <input type="text" class="form-control" id="class-name-${semesterId}-${classCount}" placeholder="Enter class name">
        </div>
        <div class="col-md-3 mb-3">
            <label for="class-grade-${semesterId}-${classCount}">Class Grade</label>
            <select class="form-control" id="class-grade-${semesterId}-${classCount}">
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        </div>
        <div class="col-md-3 mb-3">
            <label for="class-type-${semesterId}-${classCount}">Class Type</label>
            <select class="form-control" id="class-type-${semesterId}-${classCount}">
                <option value="Regular">Regular</option>
                <option value="Honors">Honors</option>
                <option value="AP">AP</option>
            </select>
        </div>
        <div class="col-md-2 mb-3 text-center">
            <button class="btn btn-outline-danger" onclick="removeClass(this)"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
    classesContainer.appendChild(classItem);
}

// Function to remove a class
function removeClass(element) {
    element.closest('.class-item').remove();
}

// Function to confirm removal of semester
function confirmRemoveSemester(semesterId) {
    showConfirmation('Are you sure you want to remove this semester? It will remove all class information entered for this semester.', 'warning', () => {
        document.getElementById(`classes-container-${semesterId}`).closest('.semester').remove();
        semesterCount--;
    });
}

// Function to clear all classes in a semester
function confirmClearSemester(semesterId) {
    showConfirmation('Are you sure you want to clear all class data for this semester?', 'warning', () => {
        const classesContainer = document.getElementById(`classes-container-${semesterId}`);
        classesContainer.innerHTML = ''; // Clear all class elements
        addClass(semesterId); // Add a default class input
    });
}

// Function to add previous GPAs input field
function addPreviousGPA() {
    const container = document.getElementById('previous-gpas-container');
    const gpaInput = document.createElement('div');
    gpaInput.className = 'input-group mb-3 col-md-3';
    gpaInput.innerHTML = `
        <input type="number" class="form-control previous-gpa-input" placeholder="Enter previous GPA (e.g., 3.500)" step="0.001" min="0" max="4.3">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" onclick="removePreviousGPA(this)"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
    container.appendChild(gpaInput);
}

// Function to remove previous GPA input field
function removePreviousGPA(button) {
    button.closest('.input-group').remove();
}

// Function to show confirmation dialogs
function showConfirmation(message, type, onConfirm) {
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    document.getElementById('confirmationMessage').textContent = message;
    const confirmButton = document.getElementById('confirmAction');
    confirmButton.onclick = () => {
        onConfirm();
        confirmationModal.hide();
    };
    confirmationModal.show();
}

// Function to calculate GPA for a semester
function calculateSemesterGPA(semesterId) {
    const classesContainer = document.getElementById(`classes-container-${semesterId}`);
    const classItems = classesContainer.querySelectorAll('.class-item');
    const grades = [];

    classItems.forEach(classItem => {
        const letterGrade = classItem.querySelector(`[id^="class-grade"]`).value;
        const courseType = classItem.querySelector(`[id^="class-type"]`).value;
        if (letterGrade && courseType) {
            grades.push({ letterGrade, courseType });
        }
    });

    const semesterGPA = calculateGPA(grades);
    alert(`GPA for Semester ${semesterId}: ${semesterGPA}`);
}

// Function to calculate grade points
function getGradePoints(letterGrade, courseType) {
    const gradeScale = {
        "A+": 4.3, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "F": 0.0
    };

    let basePoints = gradeScale[letterGrade];
    if (courseType === "Honors") {
        basePoints += 0.5;
    } else if (courseType === "AP") {
        basePoints += 1.0;
    }
    return basePoints;
}

// Function to calculate GPA
function calculateGPA(grades) {
    let totalPoints = 0.0;
    let totalClasses = 0;

    grades.forEach(course => {
        const { letterGrade, courseType } = course;
        totalPoints += getGradePoints(letterGrade, courseType);
        totalClasses += 1;
    });

    if (totalClasses === 0) {
        return 0.0;
    }
    return (totalPoints / totalClasses).toFixed(3);
}

// Function to calculate cumulative GPA
function calculateCumulativeGPA() {
    const semesters = document.getElementsByClassName('semester');
    const allGrades = [];
    const previousGPAs = document.querySelectorAll('.previous-gpa-input');

    let previousGpaSum = 0.0;
    let previousGpaCount = 0;

    previousGPAs.forEach(input => {
        const gpa = parseFloat(input.value);
        if (!isNaN(gpa)) {
            previousGpaSum += gpa;
            previousGpaCount++;
        }
    });

    Array.from(semesters).forEach((semester) => {
        const classItems = semester.querySelectorAll('.class-item');
        classItems.forEach((classItem) => {
            const letterGrade = classItem.querySelector(`[id^="class-grade"]`).value;
            const courseType = classItem.querySelector(`[id^="class-type"]`).value;

            if (letterGrade && courseType) {
                allGrades.push({ letterGrade, courseType });
            }
        });
    });

    const currentGPA = calculateGPA(allGrades);
    const totalGPA = (parseFloat(currentGPA) * allGrades.length + previousGpaSum) / (allGrades.length + previousGpaCount);
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Cumulative GPA: ${totalGPA.toFixed(3)}`;
    resultElement.classList.add('visible');
}
