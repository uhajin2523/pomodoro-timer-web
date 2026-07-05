const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

const timerCard = document.querySelector(".timer-card");
const timeDisplay = document.getElementById("time-display");
const currentTimeDisplay = document.getElementById("current-time");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return saved > 0 ? saved : DEFAULT_MINUTES;
}

let remainingSeconds = getSavedMinutes() * 60;
let timerId = null;

function updateDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timeDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function startTimer() {
  if (timerId !== null) return;

  timerCard.classList.remove("timer-complete", "shake-paused");

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      timerId = null;
      timerCard.classList.add("timer-complete");
      return;
    }
    remainingSeconds -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getSavedMinutes() * 60;
  timerCard.classList.remove("timer-complete", "shake-paused");
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
timerCard.addEventListener("click", () => {
  if (timerCard.classList.contains("timer-complete")) {
    timerCard.classList.add("shake-paused");
  }
});

function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

updateDisplay();
updateCurrentTime();
setInterval(updateCurrentTime, 1000);
