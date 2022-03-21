import { obj } from "./db.js"
import { Toggle } from "./actions.js"
let nowDate = new Date()
let curYear = nowDate.getFullYear()
let curMonth = nowDate.getMonth()
let curDateNum = nowDate.getDate()
export let monthName = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    container = document.getElementById('calendar')
export let monthContainer = container.getElementsByClassName('month-name')[0]
export let yearContainer = container.getElementsByClassName('year-name')[0]
let daysContainer = container.getElementsByClassName('days')[0]

function setCurMonthAndYear() {
    let month = monthName[curMonth];
    monthContainer.innerHTML = month;
    yearContainer.innerHTML = curYear;
}
setCurMonthAndYear();


export function setMonthCalendar(year, month) {
    let days = new Date(year, month + 1, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
        monthDaysText = '';

    monthContainer.innerText = monthName[month];
    yearContainer.innerText = year;
    daysContainer.innerHTML = '';

    if (monthPrefix > 0) {
        for (let i = 1; i <= monthPrefix; i++) {
            monthDaysText += '<li></li>';
        }
    }

    for (let i = 1; i <= days; i++) {
        monthDaysText += '<li>' + i + '</li>';
    }

    daysContainer.innerHTML = monthDaysText;

    if (month == curMonth && year == curYear) {
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix + curDateNum - 1].classList.add('date-now');
    }

    addPrice();
}
setMonthCalendar(curYear, curMonth);
function addPrice() {
    let weekdayPrice = "10",
        weekendPrice = "30",
        weeksArr = [],
        weekLength = 7

    let daysArr = document.querySelectorAll('.days')[0].children;
    let arr = Array.prototype.slice.call(daysArr)

    for (let i = 0; i < arr.length; i += weekLength) {
        let cuhunk = arr.slice(i, i + weekLength)
        weeksArr.push(cuhunk);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i].appendChild(document.createElement('p')).classList.add('price');
        arr[i].appendChild(document.createElement('p')).classList.add('name');
    }

    let priceArr = document.querySelectorAll(".price");
    let count = 0;

    for (let i = 0, j = 0; i < weeksArr.length; i++) {

        for (let j = 0; j < weeksArr[i].length; j++) {
            if (weeksArr[i][j].innerText !== "") {
                if (j < 5) {
                    priceArr[count].innerText = weekdayPrice;
                } else {
                    priceArr[count].innerText = weekendPrice;
                }
            }
            count++
        }

    }
    let arrDay = []
    for (let i = 0; i < daysArr.length; i++) {
        if (daysArr[i].innerText !== '')
            arrDay.push(daysArr[i])
    }

    if (obj[`${monthContainer.innerText} ${yearContainer.innerText}`]) {
        const arrData = Object.values(obj[`${monthContainer.innerText} ${yearContainer.innerText}`])
        const Username = Object.keys(obj[`${monthContainer.innerText} ${yearContainer.innerText}`]);
        for (let i = 0; i < arrData.length; i++) {
            const userData = arrData[i]["booking"].split("-")
            if (userData.length === 1)
                userData[1] = userData[0]
            for (let j = userData[0] - 1; j < userData[1]; j++) {
                arrDay[j].classList.add("selected");
                arrDay[j].querySelector(".name").innerText = Username[i]
                arrDay[j].style.pointerEvents = "none";
            }
        }
    }
    arrDay.forEach((day) => Toggle(day));
}
