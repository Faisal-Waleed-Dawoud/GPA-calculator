let toggleBtn = document.querySelector(".mode-toggle")
let completedCreditHours = document.getElementById("completed-credit-hours")
let cumilativeGPA = document.getElementById("overall-gpa")
let creditHours = 0
let overallGPA = 0
let totalPoints = 0
let savedGrades = document.getElementById("items-container")
const grades = document.querySelectorAll('.grow [name=grade]');
const hours = document.querySelectorAll('.grow [name=hourse]');
const courses = document.querySelectorAll('.grow [type=text]');
let courseNumber = 0
const checkBox = document.querySelector("input[type=checkbox]");
const cumliativeContainer = document.querySelector("#cumliative");

function changeMode() {
    document.documentElement.classList.toggle("dark")
}

function changeClass(parent, element, desiredClass, oldClass) {
    if (parent) {
        parent.firstElementChild.classList.contains(desiredClass) ? parent.firstElementChild.classList.replace(desiredClass, oldClass) : parent.firstElementChild.classList.replace(oldClass, desiredClass)
    }
}



function calculateTotalPoints() {
    totalPoints = (creditHours * overallGPA)
}


toggleBtn.addEventListener("click", function() {
    changeMode()
    changeClass(toggleBtn, "", "fa-sun", "fa-moon")
})

function Calculator() {
    const grades = document.querySelectorAll('[name=grade]');
    const hours = document.querySelectorAll('[name=hourse]');

    let totalWeightedPoints = 0;
    let totalCreditHours = 0;
    
    grades.forEach((gradeInput, index) => {
        const grade = +gradeInput.value;
        const hour = +hours[index]?.value; 

        
        if (!isNaN(grade) && !isNaN(hour)) {
            totalWeightedPoints += grade * hour;
            totalCreditHours += hour;
        }
    });

    let totalGPA = (totalPoints + totalWeightedPoints) / (totalCreditHours + creditHours) 
    const termGPA = totalCreditHours > 0 ? (totalWeightedPoints / totalCreditHours).toFixed(2) : "0.00";
    ShowMessage(termGPA, totalGPA);
}

function ShowMessage(termGPA, totalGPA) {
    let message = `Your Semester GPA is : ${termGPA}`; 
    if (checkBox.checked)
        message += `, Your Cumilative GPA is: ${totalGPA}`;
    window.alert(message);
}

document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault(); 
    Calculator();
})

// Manages saving
function SaveToLocalStorage() {
    let [courses, number] = creatingCoursesArray()
    window.localStorage.setItem(`item-${number}`, courses);
    loadSavedGrades()
}

// Stores the objects in the local storage
function creatingCoursesArray() {
    let savingDate = new Date
    let day = savingDate.getDate()
    let month = savingDate.getMonth() + 1
    let year = savingDate.getFullYear()
    let coursesArray = []
    grades.forEach((e, i) => {
        if (courses[i].value.trim() && typeof courses[i].value.trim() !== undefined) {
            coursesArray.push(JSON.stringify({"Name" : courses[i].value.trim(), "Grade" : e.value, "Hours": hours[i].value}))
        }
    })
    coursesArray.push(JSON.stringify({"Date": `${day}-${month}-${year}`}))
    courseNumber += 1
    return [coursesArray, courseNumber]
}


// Used to load elements depending on the local storage
function loadSavedGrades() {
    savedGrades.innerHTML = ``
    for (let i = 0; i < localStorage.length; i++) {
        let date = gettingLocalStorageItems(`item-${i+1}`)
        savedGrades.innerHTML += `<div id="SavedItems" class="saved-grade item-${i+1} group">
        <i class="fa-regular fa-file hover-effect text-[22px]"></i>
        <p class="hover-effect">${date[date.length - 1].Date}</p>
        </div>`
    }
}
// First page load
if (localStorage.length > 0) {
    loadSavedGrades()
}

const mySaveButton = document.querySelector(".save-btn");
mySaveButton.addEventListener("click", () => {
    SaveToLocalStorage();
});

// Used to read local storage objects
function gettingLocalStorageItems(element) {
    let unFormatedCourse = localStorage.getItem(element) 
    let formatedCourse = JSON.parse('[' + unFormatedCourse.replace(/}{/g, '},{') + ']');
    return formatedCourse
}

// Used to write data from the local sotrage object
function LoadFromLocalStorage(key) {
    let coursesArray = gettingLocalStorageItems(key)
    for (let i = 0; i < courses.length; i++) {
        courses[i].value = ""
        grades[i].value = ""
        hours[i].value = ""
    }
    for (let i = 0; i < localStorage.length; i++) {
        for (let j = 0; j < coursesArray.length - 1; j++) {
            let {Name, Grade, Hours} = coursesArray[j]
            Name !== null ? courses[j].value = Name : "";
            if (Grade !== null) grades[j].value = Grade;
            if (Hours !== null) hours[j].value = Hours;
        }
    }
}

const savedItmesButton = document.getElementById("SavedItems");
savedItmesButton.addEventListener("click", () => {
    LoadFromLocalStorage();
}) ;

function add_row() {
    const addRowButton = document.getElementById("add-row");
    const container = document.getElementById("container");

    addRowButton.addEventListener("click", function (e) {
        e.preventDefault(); 

        const row = document.createElement("div");
        row.className = "flex gap-4 flex-row";
        row.style = `margin-top: 1rem`;
        row.innerHTML = `
            <div class="grow">
                <p>Course Name</p>
                <input type="text" class="custom-input">
            </div>
            <div class="grow">
                <p>Credit Hours</p>
                <input type="number" name="hourse" min="1" class="w-full custom-input" required>
            </div>
            <div class="grow">
                <p>Grade</p>
                <select name="grade" class="w-full custom-input" required>
                    <option value="4">A+ (4)</option>
                    <option value="3.75">A (3.75)</option>
                    <option value="3.5">B+ (3.5)</option>
                    <option value="3">B (3)</option>
                    <option value="2.5">C+ (2.5)</option>
                    <option value="2">C (2)</option>
                    <option value="1.5">D+ (1.5)</option>
                    <option value="1">D (1)</option>
                    <option value="0">F (0)</option>
                </select>
            </div>
            <div class="trash">
                <i class="fa-solid fa-trash"></i>
            </div>
        `;

        container.appendChild(row);

        const trashBtn = row.querySelector(".trash");
        trashBtn.addEventListener("click", () => {
            row.remove(); 
        });
    });
}
document.addEventListener("DOMContentLoaded", add_row);


savedGrades.addEventListener("click", (e) => {
    for (let i = 0; i < localStorage.length; i++) {
        if (e.target.classList.contains(`item-${i+1}`)) {
            LoadFromLocalStorage(`item-${i+1}`)
        }
    }
})


checkBox.addEventListener("click", () => {
    
    const feilds = document.createElement("div");
    if (checkBox.checked) {
        feilds.innerHTML = `
            <div class="flex flex-row gap-4 cumliativeFeilds" >
                <div>
                    <p>Completed Credit Hours</p>
                    <input type="number" class="custom-input" id="completed-credit-hours" min="1" required>
                </div>
                <div>
                    <p>Cumilative GPA</p>
                    <input type="number" class="custom-input" id="overall-gpa" min="0" step="0.01" required>
                </div>
            </div>
            `;
            cumliativeContainer.appendChild(feilds);
            calculateTotalPoints()
    }

    else {
        const exsitedFeilds = document.querySelector(".cumliativeFeilds");
        exsitedFeilds.remove();
    }
})