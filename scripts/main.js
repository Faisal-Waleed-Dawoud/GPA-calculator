let toggleBtn = document.querySelector(".mode-toggle")

function changeMode() {
    document.documentElement.classList.toggle("dark")
}

function changeClass(parent, element, desiredClass, oldClass) {
    if (parent) {
        parent.firstElementChild.classList.contains(desiredClass) ? parent.firstElementChild.classList.replace(desiredClass, oldClass) : parent.firstElementChild.classList.replace(oldClass, desiredClass)
    }
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
        const grade = Number(gradeInput.value);
        const hour = Number(hours[index]?.value); 

        

        if (!isNaN(grade) && !isNaN(hour)) {
            totalWeightedPoints += grade * hour;
            totalCreditHours += hour;
        }
        
    });

    const GPA = totalCreditHours > 0 ? (totalWeightedPoints / totalCreditHours).toFixed(2) : "0.00";
    window.alert(`GPA: ${GPA}`);
}



document.querySelector("button").onclick = () => {
    Calculator();
}
