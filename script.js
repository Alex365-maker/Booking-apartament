let nowDate = new Date(),
  curYear = nowDate.getFullYear(),
  curMonth = nowDate.getMonth(),
  curDateNum = nowDate.getDate(),
  monthName = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
container = document.getElementById('calendar'),
  monthContainer = container.getElementsByClassName('month-name')[0],
  yearContainer = container.getElementsByClassName('year-name')[0],
  daysContainer = container.getElementsByClassName('days')[0],
  prev = container.getElementsByClassName('prev')[0],
  next = container.getElementsByClassName('next')[0]
inputSum = document.querySelector(".inputSum")
button = document.querySelector(".bookingSubmit")
NameInput = document.querySelector(".NameInput")
email = document.querySelector(".emailInput")
time = document.querySelector(".sel")


let bd = {
  "MARCH 2022": {
    "alex": {
      "booking": "21-25",
      "email": "mralex@gamil.com",
      "time": "10"
    },
    "Jack":
    {
      "booking": "29-30",
      "email": "mralex@gamil.com",
      "time": "10"
    }
  },
  "APRIL 2022": {
    "alex":
    {
      "booking": "1-5",
      "email": "mralex@gamil.com",
      "time": "10"
    },
    "Jack":
    {
      "booking": "12-14",
      "email": "mralex@gamil.com",
      "time": "10"
    }
  },
}

if (!localStorage.getItem('myStorage')) {
  localStorage.setItem('myStorage', JSON.stringify(bd))
}

var obj = JSON.parse(localStorage.getItem('myStorage'));
let curDate = nowDate.setMonth(nowDate.getMonth() - 1);


function setCurMonthAndYear() {
  let month = monthName[curMonth];
  monthContainer.innerHTML = month;
  yearContainer.innerHTML = curYear;
}
setCurMonthAndYear();


function setMonthCalendar(year, month) {
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

prev.addEventListener("click", function () {
  let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));
  curDate.setMonth(curDate.getMonth() - 1);
  let curYear = curDate.getFullYear(),
    curMonth = curDate.getMonth();

  setMonthCalendar(curYear, curMonth);

});

next.addEventListener("click", function () {
  let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));
  curDate.setMonth(curDate.getMonth() + 1);

  let curYear = curDate.getFullYear(),
    curMonth = curDate.getMonth();

  setMonthCalendar(curYear, curMonth);

});


function addPrice() {
  let weekdayPrice = "10",
    weekendPrice = "30",
    weeksArr = [],
    weekLength = 7


  daysArr = document.querySelectorAll('.days')[0].children;
  arr = Array.prototype.slice.call(daysArr)

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
      console.log(arrData[i]["booking"].length)
      if(userData.length===1)
      userData[1] = userData[0]
      for (let j = userData[0] - 1; j < userData[1]; j++) {
        arrDay[j].classList.add("selected");
        arrDay[j].querySelector(".name").innerText = Username[i]
        arrDay[j].style.pointerEvents = "none";
      }
    }
  }

  let sum = 0;
  arrDay.forEach((day) =>
    day.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("selected");
      if (e.currentTarget.classList.length) {
        sum += +e.currentTarget.querySelector(".price").textContent
      } else {
        sum -= +e.currentTarget.querySelector(".price").textContent
      }
      inputSum.value = sum + " rub."
    })
  );

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
    for (let i = 0; i < arrDay.length; i++) {
      if (arrDay[i].classList.length && arrDay[i].style.pointerEvents === "")
        bookingData.push(+arrDay[i].textContent.slice(0, 2))
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
    // sendEmail("info@itspro.by", bookingData[0], time.value)
    // sendEmail(email.value, bookingData[0], time.value)
  })

}
