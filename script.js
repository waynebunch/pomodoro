let timeValue = 25,
    breakValue = 5,
    countdown = new Date(timeValue * 60000),
    breakCountdown = new Date(breakValue * 60000),
    clock = document.getElementById('clock'),
    breakDisplay = document.getElementById('breakDisplay'),
    circleColor = document.getElementById('mainContainer'),
    timer = null,
    breakTimer = null,
    flag = 0, //if I don't do this starting at original 25 min does some funky thing
    circleSeconds = 0,
    circleSecondsCountdown = 0,
    circlePercentUp = 0,
    circlePercentDown = 0;

clock.addEventListener('click', function() {

    if (flag === 0) {
        flag = 1;
        circleSeconds = timeValue * 60;
        circleSecondsCountdown = circleSeconds;
        startClock();
    } else if (flag === 1) {
        flag = 2;
        stopClock();
    } else {
        flag = 1;
        startClock();
    }
})

timePlusButton.addEventListener('click', addTime);
timeMinusButton.addEventListener('click', minusTime);
breakPlusButton.addEventListener('click', breakAddTime);
breakMinusButton.addEventListener('click', breakMinusTime);

function startClock() {
    let finalTime = countdown.setSeconds(countdown.getSeconds() - 1);
    let addZero = countdown.getMinutes() + ':' + '0' + countdown.getSeconds();
    let noZero = countdown.getMinutes() + ':' + countdown.getSeconds();

    circlePercentUp = 100 - Math.round(circleSecondsCountdown / circleSeconds * 100);
    circlePercentDown = Math.round(circleSecondsCountdown / circleSeconds * 100);
    circleColor.style.background = "linear-gradient(0deg, rgb(0,255,0) " +
        circlePercentDown + "%, rgb(255,0,0)" + circlePercentUp + "%)";
    circleSecondsCountdown -= 1;

    clearTimeout(timer);

    timer = setTimeout(startClock, 1000);

    if (countdown.getSeconds() < 10 ? clock.innerHTML = addZero : clock.innerHTML = noZero)

    if (finalTime === 0) {
        clearTimeout(timer);
        clock.innerHTML = '0:00';
        breakClock();
    }
}

function breakClock() {
    let finalTime = breakCountdown.setSeconds(breakCountdown.getSeconds() - 1);
    let addZero = breakCountdown.getMinutes() + ':' + '0' + breakCountdown.getSeconds();
    let noZero = breakCountdown.getMinutes() + ':' + breakCountdown.getSeconds();

    clearTimeout(breakTimer);

    breakTimer = setTimeout(breakClock, 1000);

    if (breakCountdown.getSeconds() < 10 ? breakDisplay.innerHTML = addZero :
        breakDisplay.innerHTML = noZero)

    if (finalTime === 0) {
        clearTimeout(breakTimer);
        breakDisplay.innerHTML = '0:00';
    }
}

function stopClock() {
    clearTimeout(timer);
}

function addTime() {
    timeValue += 1;
    document.getElementById('clock').innerHTML = timeValue + ":00";
    countdown.setMinutes(timeValue);
}

function minusTime() {

    if (timeValue >= 2) {
        timeValue -= 1;
        document.getElementById('clock').innerHTML = timeValue + ":00";
        countdown.setMinutes(timeValue);
    } else {
        timeValue = 1;
        document.getElementById('clock').innerHTML = timeValue + ":00";
        countdown.setMinutes(timeValue);
    }
}

function breakAddTime() {
    breakValue += 1;
    document.getElementById('breakDisplay').innerHTML = breakValue + ":00";
    breakCountdown.setMinutes(breakValue);
}

function breakMinusTime() {
  if (breakValue >= 2) {
    breakValue -= 1;
    document.getElementById('breakDisplay').innerHTML = breakValue + ":00";
    breakCountdown.setMinutes(breakValue);
  } else {
    breakValue = 1;
    document.getElementById('breakDisplay').innerHTML = breakValue + ":00";
    breakCountdown.setMinutes(breakValue);
  }
}

