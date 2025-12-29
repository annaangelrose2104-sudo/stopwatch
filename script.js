let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let lapCounter = 1;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.querySelector('.laps');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
}

function updateDisplay() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    display.textContent = formatTime(hours, minutes, seconds);
}

function lap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        laps.appendChild(li);
    }
}

function formatTime(h, m, s) {
    const displayHours = h < 10 ? '0' + h : h;
    const displayMinutes = m < 10 ? '0' + m : m;
    const displaySeconds = s < 10 ? '0' + s : s;
    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
