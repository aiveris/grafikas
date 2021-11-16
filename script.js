"use strict";

window.onload = function () {
  today();
};

function today() {
  const date = new Date();
  const day = date.getDate();
  console.log(day);
  // const day = 27;

  switch (day) {
    case 1:
      // document.getElementById("1").innerHTML = "1";
      document.getElementById("1").className = "free today";
      break;
    case 2:
      document.getElementById("2").className = "free today";
      break;
    case 3:
      document.getElementById("3").className = "work today";
      break;
    case 4:
      document.getElementById("4").className = "work today";
      break;
    case 5:
      document.getElementById("5").className = "free today";
      break;
    case 6:
      document.getElementById("6").className = "work today";
      break;
    case 7:
      document.getElementById("7").className = "work today";
      break;
    case 8:
      document.getElementById("8").className = "work today";
      break;
    case 9:
      document.getElementById("9").className = "work today";
      break;
    case 10:
      document.getElementById("10").className = "work today";
      break;
    case 11:
      document.getElementById("11").className = "free today";
      break;
    case 12:
      document.getElementById("12").className = "free today";
      break;
    case 13:
      document.getElementById("13").className = "work today";
      break;
    case 14:
      document.getElementById("14").className = "work today";
      break;
    case 15:
      document.getElementById("15").className = "work today";
      break;
    case 16:
      document.getElementById("16").className = "work today";
      break;
    case 17:
      document.getElementById("17").className = "free today";
      break;
    case 18:
      document.getElementById("18").className = "work today";
      break;
    case 19:
      document.getElementById("19").className = "work today";
      break;
    case 20:
      document.getElementById("20").className = "work today";
      break;
    case 21:
      document.getElementById("21").className = "free today";
      break;
    case 22:
      document.getElementById("22").className = "free today";
      break;
    case 23:
      document.getElementById("23").className = "work today";
      break;
    case 24:
      document.getElementById("24").className = "work today";
      break;
    case 25:
      document.getElementById("25").className = "work today";
      break;
    case 26:
      document.getElementById("26").className = "work today";
      break;
    case 27:
      document.getElementById("27").className = "free today";
      break;
    case 28:
      document.getElementById("28").className = "free today";
      break;
    case 29:
      document.getElementById("29").className = "work today";
      break;
    case 30:
      document.getElementById("30").className = "work today";
      break;
    case 31:
      document.getElementById("31").className = "today";
      break;
  } //switch
} //today()
