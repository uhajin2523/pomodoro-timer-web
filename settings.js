const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("timer-minutes");
const saveBtn = document.getElementById("save-btn");

function isInRange(value) {
  const minutes = Number(value);
  return (
    Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES
  );
}

function updateSaveButtonState() {
  saveBtn.disabled = minutesInput.value === "";
}

function loadSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  minutesInput.value = saved > 0 ? saved : DEFAULT_MINUTES;
}

function saveMinutes() {
  if (minutesInput.value === "") return;

  if (!isInRange(minutesInput.value)) {
    alert(`${MIN_MINUTES}~${MAX_MINUTES} 사이의 숫자를 입력해주세요.`);
    return;
  }

  localStorage.setItem(STORAGE_KEY, String(Number(minutesInput.value)));
}

minutesInput.addEventListener("input", updateSaveButtonState);
saveBtn.addEventListener("click", saveMinutes);

loadSavedMinutes();
updateSaveButtonState();
