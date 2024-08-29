let semesterCount = 1; // Initialize semester count

// Function to add a new semester
function addSemester() {
    semesterCount++;
    createSemesterElement(semesterCount);
    saveDataToLocalStorage(); // Save data to local storage
}

// Function to create a semester element
function createSemesterElement(semesterId) {
    const semesterContainer = document.getElementById('semesters-container');
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'semester shadow p-4 mb-5 bg-white rounded position-relative';
    semesterDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-4">Semester ${semesterId}</h3>
            <button class="btn btn-link text-danger" onclick="confirmRemoveSemester(${semesterId})"><i class="fas fa-trash"></i></button>
        </div>
        <div id="classes-container-${semesterId}" class="classes-container">
            <div class="class-item form-row align-items-end mb-3">
                <div class="col-md-4 mb-3">
                    <label for="class-name-${semesterId}-1">Class Name</label>
                    <input type="text" class="form-control" id="class-name-${semesterId}-1" placeholder="Enter class name" onchange="saveDataToLocalStorage()">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="class-grade-${semesterId}-1">Class Grade</label>
                    <select class="form-control" id="class-grade-${semesterId}-1" onchange="saveDataToLocalStorage()">
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
                    <label for="class-type-${semesterId}-1">Class Type</label>
                    <select class="form-control" id="class-type-${semesterId}-1" onchange="saveDataToLocalStorage()">
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
            <button class="btn btn-outline-secondary" onclick="addClass(${semesterId})"><i class="fas fa-plus"></i> Add Class</button>
            <button class="btn btn-outline-info" onclick="calculateSemesterGPA(${semesterId})"><i class="fas fa-calculator"></i> Calculate Semester GPA</button>
        </div>
        <div class="text-center mt-2">
            <button class="btn btn-link text-secondary" onclick="confirmClearSemester(${semesterId})"><i class="fas fa-eraser"></i> Clear Semester</button>
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
            <input type="text" class="form-control" id="class-name-${semesterId}-${classCount}" placeholder="Enter class name" onchange="saveDataToLocalStorage()">
        </div>
        <div class="col-md-3 mb-3">
            <label for="class-grade-${semesterId}-${classCount}">Class Grade</label>
            <select class="form-control" id="class-grade-${semesterId}-${classCount}" onchange="saveDataToLocalStorage()">
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
            <select class="form-control" id="class-type-${semesterId}-${classCount}" onchange="saveDataToLocalStorage()">
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
    saveDataToLocalStorage(); // Save data to local storage
}

// Function to remove a class
function removeClass(element) {
    element.closest('.class-item').remove();
    saveDataToLocalStorage(); // Save data to local storage
}

// Function to confirm removal of semester
function confirmRemoveSemester(semesterId) {
    showConfirmation('Are you sure you want to remove this semester? It will remove all class information entered for this semester.', 'warning', () => {
        document.getElementById(`classes-container-${semesterId}`).closest('.semester').remove();
        semesterCount--;
        saveDataToLocalStorage(); // Save data to local storage
    });
}

// Function to clear all classes in a semester
function confirmClearSemester(semesterId) {
    showConfirmation('Are you sure you want to clear all class data for this semester?', 'warning', () => {
        const classesContainer = document.getElementById(`classes-container-${semesterId}`);
        classesContainer.innerHTML = ''; // Clear all class elements
        addClass(semesterId); // Add a default class input
        saveDataToLocalStorage(); // Save data to local storage
    });
}

// Function to add previous GPAs input field
function addPreviousGPA() {
    const container = document.getElementById('previous-gpas-container');
    const gpaInput = document.createElement('div');
    gpaInput.className = 'input-group mb-3 col-md-3';
    gpaInput.innerHTML = `
        <input type="number" class="form-control previous-gpa-input" placeholder="Enter previous GPA (e.g., 3.500)" step="0.001" min="0" max="4.3" onchange="saveDataToLocalStorage()">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" onclick="removePreviousGPA(this)"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
    container.appendChild(gpaInput);
    saveDataToLocalStorage(); // Save data to local storage
}

// Function to remove previous GPA input field
function removePreviousGPA(button) {
    button.closest('.input-group').remove();
    saveDataToLocalStorage(); // Save data to local storage
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

// Save data to local storage
function saveDataToLocalStorage() {
    const semesters = document.getElementsByClassName('semester');
    const data = { semesters: [], previousGPAs: [] };

    // Save semesters
    Array.from(semesters).forEach((semester, index) => {
        const classes = [];
        const classItems = semester.querySelectorAll('.class-item');
        classItems.forEach((classItem) => {
            const className = classItem.querySelector(`[id^="class-name"]`).value;
            const letterGrade = classItem.querySelector(`[id^="class-grade"]`).value;
            const courseType = classItem.querySelector(`[id^="class-type"]`).value;
            if (className && letterGrade && courseType) {
                classes.push({ className, letterGrade, courseType });
            }
        });
        data.semesters.push({ semesterId: index + 1, classes });
    });

    // Save previous GPAs
    const previousGPAs = document.querySelectorAll('.previous-gpa-input');
    previousGPAs.forEach(input => {
        const gpa = parseFloat(input.value);
        if (!isNaN(gpa)) {
            data.previousGPAs.push(gpa);
        }
    });

    localStorage.setItem('gpaData', JSON.stringify(data)); // Store data in local storage
}

// Load data from local storage
function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('gpaData'));
    if (data) {
        // Load semesters
        data.semesters.forEach((semesterData) => {
            createSemesterElement(semesterData.semesterId);
            const classesContainer = document.getElementById(`classes-container-${semesterData.semesterId}`);
            semesterData.classes.forEach((classData, index) => {
                addClass(semesterData.semesterId);
                const classNameInput = classesContainer.querySelector(`[id="class-name-${semesterData.semesterId}-${index + 1}"]`);
                const classGradeSelect = classesContainer.querySelector(`[id="class-grade-${semesterData.semesterId}-${index + 1}"]`);
                const classTypeSelect = classesContainer.querySelector(`[id="class-type-${semesterData.semesterId}-${index + 1}"]`);

                if (classNameInput) classNameInput.value = classData.className;
                if (classGradeSelect) classGradeSelect.value = classData.letterGrade;
                if (classTypeSelect) classTypeSelect.value = classData.courseType;
            });
        });

        // Load previous GPAs
        const container = document.getElementById('previous-gpas-container');
        data.previousGPAs.forEach(gpa => {
            const gpaInput = document.createElement('div');
            gpaInput.className = 'input-group mb-3 col-md-3';
            gpaInput.innerHTML = `
                <input type="number" class="form-control previous-gpa-input" placeholder="Enter previous GPA (e.g., 3.500)" step="0.001" min="0" max="4.3" value="${gpa}" onchange="saveDataToLocalStorage()">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" onclick="removePreviousGPA(this)"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            container.appendChild(gpaInput);
        });
    }
}

// Initialize page
function initializePage() {
    loadDataFromLocalStorage();
}

initializePage(); // Load data when the page loads
