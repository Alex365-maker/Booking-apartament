let db = {
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
  localStorage.setItem('myStorage', JSON.stringify(db))
}

export var obj = JSON.parse(localStorage.getItem('myStorage'));