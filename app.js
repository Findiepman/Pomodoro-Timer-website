const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const session = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds")
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector(".btn-pause")

let isRunning = false;
let myInterval;
let state = true;
let totalSeconds = 0;


const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (!state) return;      // already running → do nothing

    state = false;

    if (totalSeconds === 0) {
        totalSeconds = sessionAmount * 60;
    }

    const updateSeconds = () => {
        const minuteDiv = document.querySelector(".minutes");
        const secondDiv = document.querySelector(".seconds");

        totalSeconds--;

        const minutesLeft = Math.floor(totalSeconds / 60);
        const secondsLeft = totalSeconds % 60;

        minuteDiv.textContent = minutesLeft;
        secondDiv.textContent = secondsLeft.toString().padStart(2, "0");

        if (totalSeconds <= 0) {
            clearInterval(myInterval);
            state = true;
            totalSeconds = 0;
        }
    };

    myInterval = setInterval(updateSeconds, 1000);
};

startBtn.addEventListener("click", appTimer);

const resetTimer = () => {
    clearInterval(myInterval);
    state = true;
    totalSeconds = 0;

    document.querySelector(".minutes").textContent = "25";
    document.querySelector(".seconds").textContent = "00";
    document.querySelector(".btn-pause").textContent = "pause";
};
const pauseTimer = () => {
    if (state) return;
    clearInterval(myInterval);
    state = true;
};
const togglePause = () => {

    if (totalSeconds === 0 && state) return;

    if (state) {
        pauseBtn.textContent = "pause";
        appTimer();
    } else {
        pauseBtn.textContent = "resume";
        pauseTimer();
    }
};
document.querySelector(".btn-start").addEventListener("click", appTimer);
document.querySelector(".btn-pause").addEventListener("click", togglePause);
document.querySelector(".btn-reset").addEventListener("click", resetTimer);

