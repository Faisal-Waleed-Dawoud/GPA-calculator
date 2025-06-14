let toggleBtn = document.querySelector(".mode-toggle")
let completedCreditHours = document.getElementById("completed-credit-hours")
let cumilativeGPA = document.getElementById("overall-gpa")
let creditHours = 0
let overallGPA = 0
let totalPoints = 0

function changeMode() {
    document.documentElement.classList.toggle("dark")
}

function changeClass(parent, element, desiredClass, oldClass) {
    if (parent) {
        parent.firstElementChild.classList.contains(desiredClass) ? parent.firstElementChild.classList.replace(desiredClass, oldClass) : parent.firstElementChild.classList.replace(oldClass, desiredClass)
    }
}

completedCreditHours.addEventListener("change", function(e) {
    creditHours = +e.target.value
    calculateTotalPoints()
})

cumilativeGPA.addEventListener("change", function(e) {
    overallGPA = +e.target.value
    calculateTotalPoints()
})

function incorrectValue(element, message) {
    element.innerHTML = message
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
    window.alert(`Your Semester GPA is : ${termGPA}, Your Cumilative GPA is: ${totalGPA}`);
}



document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault(); 
    Calculator();
})