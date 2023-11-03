function calcAge() { //calculate age
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let ageInYears = currentYear - year;
    let ageInMonths = currentMonth - month;
    let ageInDays = currentDay - day;


    if (ageInDays < 0) {
        ageInMonths--;
        ageInDays += daysInMonth(currentMonth - 1, currentYear);
    }

    if (ageInMonths < 0) {
        ageInYears--;
        ageInMonths += 12;
    }

    return { ageInYears, ageInMonths, ageInDays };

}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function validateDate() { //validate if there are inputs
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();


    if (day === "" || month === "" || year === "") { 

        const inputs = document.getElementsByTagName("input");
        for (const input of inputs) {
            input.style.border = "1px solid var(--Light-red)";
        }
        const labels = document.getElementsByTagName("label");
        for (const label of labels) {
            label.style.color = "var(--Light-red)";
        }
        const spans = document.getElementsByTagName("span");
        for (const span of spans) {
            span.style.display = "block";
        }
        return false; // Prevent form submission if there are validation errors.
    }else if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > currentYear // Check if inputs are out of valid range
    ) {

        const inputs = document.getElementsByTagName("input");
        for (const input of inputs) {
            input.style.border = "1px solid var(--Light-red)";
        }
        const labels = document.getElementsByTagName("label");
        for (const label of labels) {
            label.style.color = "var(--Light-red)";
        }
        const spans = document.getElementsByTagName("span");
        for (const span of spans) {
            span.style.display = "block";
        }
        document.getElementById('alert_day').innerHTML = "Must be a valid day";
        document.getElementById('alert_month').innerHTML = "Must be a valid month";
        document.getElementById('alert_year').innerHTML = "Must be a valid year";
        return false; // Prevent form submission if there are validation errors.
    } else if (year > currentYear) {
        // Year is in the future; display an error message or change the input field styling.
        yearInput.style.border = "1px solid var(--Light-red)";

        return false; // Prevent form submission if the year is in the future.
    } else { //calculate age if there are inputs and display it
        const { ageInYears, ageInMonths, ageInDays } = calcAge();

        document.getElementById('year_res').innerHTML = `${ageInYears}`;
        document.getElementById('month_res').textContent = ageInMonths;
        document.getElementById('day_res').textContent = ageInDays;
        
        
        const spans = document.getElementsByTagName("span");
        for (const span of spans) {
            span.style.display = "none";
        }
        const inputs = document.getElementsByTagName("input");
        for (const input of inputs) {
            input.style.border = "1px solid lightgray";
            input.style.outline = "none";
        }
        const labels = document.getElementsByTagName("label");
        for (const label of labels) {
            label.style.color = "hsl(0, 1%, 44%)";
        }

        return false; // Prevent form submission to keep the result displayed.
    }
}

