import { monthName, monthContainer, yearContainer, setMonthCalendar } from "./drawing.js"
import { obj } from "./db.js"

let prev = document.getElementsByClassName('prev')[0],
    next = document.getElementsByClassName('next')[0],
    inputSum = document.querySelector(".inputSum"),
    button = document.querySelector(".bookingSubmit"),
    NameInput = document.querySelector(".NameInput"),
    email = document.querySelector(".emailInput"),
    time = document.querySelector(".sel")

prev.addEventListener("click", function () {
    let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));
    curDate.setMonth(curDate.getMonth() - 1);
    let curYear = curDate.getFullYear();
    let curMonth = curDate.getMonth();

    setMonthCalendar(curYear, curMonth);
});

next.addEventListener("click", function () {
    let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));
    curDate.setMonth(curDate.getMonth() + 1);

    let curYear = curDate.getFullYear();
    let curMonth = curDate.getMonth();

    setMonthCalendar(curYear, curMonth);
});

let sum = 0;

export function Toggle(day) {
    day.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("selected");
        if (e.currentTarget.classList.length) {
            sum += +e.currentTarget.querySelector(".price").textContent
        } else {
            sum -= +e.currentTarget.querySelector(".price").textContent
        }
        inputSum.value = sum + " rub."
    })
}

function solve(input) {
    let arr = '';
    let g = 0;
    let a;
    a = input[0];
    for (let i = 0; i < input.length; i++) {
        if (input[i] + 1 != input[i + 1]) {
            if (g > 0) {
                arr += a + '-' + input[i] + ','
                g = 0;
                a = input[i + 1];
            } else {
                arr += input[i] + ','
                a = input[i + 1];
            }

        } else {
            g++;
        }
    }
    arr = arr.slice(0, -1)
    return arr;
}

function sendEmail(email, data, time) {
    Email.send({
        Host: "smtp.mail.com",
        Username: "mralex174@gmail.com",
        Password: "*********",
        To: email,
        From: "mralex174@gmail.com",
        Subject: "Booking of apartments",
        Body: `Hello, you have booked an apartment for April ${data}, check-in at ${time} o'clock in the morning.`,
    }).then(
        message => alert("mail sent successfully")
    );
}

let bookingData = [];

button.addEventListener("click", () => {
    let daysArr = document.querySelectorAll('.days')[0].children;
    let arrDay = []
    for (let i = 0; i < daysArr.length; i++) {
        if (daysArr[i].innerText !== '')
            arrDay.push(daysArr[i])
    }
    for (let i = 0; i < arrDay.length; i++) {
        if (arrDay[i].classList.length && arrDay[i].style.pointerEvents === "")
            bookingData.push(+arrDay[i].textContent.slice(0, arrDay[i].classList.length - 3))
    }
    bookingData = solve(bookingData).split(",")
    if (!obj[`${monthContainer.innerText} ${yearContainer.innerText}`]) {
        obj[`${monthContainer.innerText} ${yearContainer.innerText}`] = {
            [NameInput.value]: {
                "booking": bookingData[0],
                "email": email.value,
                "time": time.value
            }
        };
    } else {
        obj[`${monthContainer.innerText} ${yearContainer.innerText}`][NameInput.value] = {
            "booking": bookingData[0],
            "email": email.value,
            "time": time.value
        }
    }
    localStorage.setItem('myStorage', JSON.stringify(obj))
    sendEmail("info@itspro.by", bookingData[0], time.value)
    sendEmail(email.value, bookingData[0], time.value)
})