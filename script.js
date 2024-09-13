let timer;
let timeLeft;
const code = "1234"; // Masukkan password disini

const bombDefuseSound = document.getElementById("bombDefuseSound");
const accessDeniedSound = document.getElementById("accessDeniedSound");
const explosionSound = document.getElementById("explosionSound");

function setTimer() {
  const timerInput = parseInt(document.getElementById("timerInput").value);
  if (isNaN(timerInput) || timerInput <= 0) {
    alert("Please enter a valid number greater than 0");
    return;
  }
  timeLeft = timerInput;
  updateTimerDisplay();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      showExplosion();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  document.getElementById("time").textContent = `${minutes}:${seconds}`;
}

function defuseBomb() {
  const inputCode = document.getElementById("codeInput").value;
  if (inputCode === code) {
    clearInterval(timer);
    bombDefuseSound.play();
    showPopup("Bomb defused!");
  } else {
    accessDeniedSound.play();
    showPopup("Access denied!");
  }
}

function showPopup(message) {
  document.getElementById("popupMessage").textContent = message;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function showExplosion() {
  explosionSound.play();
  document.getElementById("explosion").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("explosion").classList.add("hidden");
  }, 2000);
}

window.onload = function () {
  timeLeft = 60;
  updateTimerDisplay();
};
