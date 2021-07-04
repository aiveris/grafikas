"use strict";

window.onload = function () {
  today();
};

function today() {
  const date = new Date();
  const day = date.getDate();
//  const day = 20;
   console.log(day);

  switch (day) {
    case 1:
      // document.getElementById("1").innerHTML = "1";
      document.getElementById("1").className = "#free";
      //   document.getElementById("1").className = "today";
      break;
    case 2:
      document.getElementById("2").className = "free";
      break;
    case 3:
      document.getElementById("3").className = "workToday";
      break;
    case 4:
      document.getElementById("4").className = "workToday";
      break;
    case 5:
      document.getElementById("5").className = "free";
      break;
    case 6:
      document.getElementById("6").className = "free";
      break;
    case 7:
      document.getElementById("7").className = "workToday";
      break;
    case 8:
      document.getElementById("8").className = "workToday";
      break;
    case 9:
      document.getElementById("9").className = "workToday";
      break;
    case 10:
      document.getElementById("10").className = "workToday";
      break;
    case 11:
      document.getElementById("11").className = "free";
      break;
    case 12:
      document.getElementById("12").className = "free";
      break;
    case 13:
      document.getElementById("13").className = "workToday";
      break;
    case 14:
      document.getElementById("14").className = "workToday";
      break;
    case 15:
      document.getElementById("15").className = "workToday";
      break;
    case 16:
      document.getElementById("16").className = "workToday";
      break;
    case 17:
      document.getElementById("17").className = "workToday";
      break;
    case 18:
      document.getElementById("18").className = "free";
      break;
    case 19:
      document.getElementById("19").className = "free";
      break;
    case 20:
      document.getElementById("20").className = "workToday";
      break;
    case 21:
      document.getElementById("21").className = "workToday";
      break;
    case 22:
      document.getElementById("22").className = "workToday";
      break;
    case 23:
      document.getElementById("23").className = "workToday";
      break;
    case 24:
      document.getElementById("24").className = "free";
      break;
    case 25:
      document.getElementById("25").className = "free";
      break;
    case 26:
      document.getElementById("26").className = "workToday";
      break;
    case 27:
      document.getElementById("27").className = "workToday";
      break;
    case 28:
      document.getElementById("28").className = "workToday";
      break;
    case 29:
      document.getElementById("29").className = "workToday";
      break;
    case 30:
      document.getElementById("30").className = "workToday";
      break;
    case 31:
      document.getElementById("31").className = "free";
      break;
  } //switch
} //today()
function todo() {
  console.log("day");
  alert("sfsdgf");
}
