let timerInterval;
let endTime;
let remainingTime;
let isRunning = false;

function updateTime() {
  const currentTime = new Date().getTime();
  remainingTime = endTime - currentTime;

  if (remainingTime >= 0) {
    const time = new Date(remainingTime);

    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    document.getElementById('time').textContent = timeString;
  } else {
    clearInterval(timerInterval);
    document.getElementById('time').textContent = '00:00:00';
    isRunning = false;
  }
}

function startTimer() {
  if (!isRunning) {
    endTime = new Date().getTime() + remainingTime;
    timerInterval = setInterval(updateTime, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    remainingTime = endTime - new Date().getTime();
    isRunning = false;
  }
}

function clearTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  isRunning = false;
  document.getElementById('time').textContent = '00:00:00';
}

function setTimer() {
  const hours = parseInt(document.getElementById('hoursInput').value || 0);
  const minutes = parseInt(document.getElementById('minutesInput').value || 0);
  const seconds = parseInt(document.getElementById('secondsInput').value || 0);

  remainingTime = hours * 3600000 + minutes * 60000 + seconds * 1000;
  endTime = new Date().getTime() + remainingTime;
  updateTime();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('clear').addEventListener('click', clearTimer);
document.getElementById('set').addEventListener('click', setTimer);
