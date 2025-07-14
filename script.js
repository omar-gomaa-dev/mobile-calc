let display = document.getElementById("display");
let historyDiv = document.getElementById("history");

function appendValue(val) {
  display.value += val;
}
function operate(op) {
  display.value += " " + op + " ";
}
function percent() {
  try {
    display.value = eval(display.value) / 100;
    addHistory(display.value + " (percent)");
  } catch {
    display.value = "Error";
  }
}
function clearDisplay() {
  display.value = "";
}
function backspace() {
  display.value = display.value.slice(0, -1);
}
function calculate() {
  try {
    let result = eval(display.value);
    if (isNaN(result) || !isFinite(result)) {
      display.value = "Error";
      return;
    }
    addHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
function addHistory(entry) {
  let div = document.createElement("div");
  div.innerText = entry;
  div.addEventListener("click", () => {
    display.value = entry.split(" = ").pop();
  });
  historyDiv.prepend(div);
  saveHistory();
}
function saveHistory() {
  localStorage.setItem("calcHistory", historyDiv.innerHTML);
}
function clearHistory() {
  historyDiv.innerHTML = "";
  localStorage.removeItem("calcHistory");
}
function toggleMode() {
  document.body.classList.toggle("light-mode");
}
function copyToClipboard() {
  if (!display.value) return;
  navigator.clipboard.writeText(display.value).then(() => {
    alert("Copied: " + display.value);
  });
}
display.addEventListener("click", copyToClipboard);

window.addEventListener("load", () => {
  historyDiv.innerHTML = localStorage.getItem("calcHistory") || "";
  historyDiv.querySelectorAll("div").forEach((div) => {
    div.addEventListener("click", () => {
      display.value = div.innerText.split(" = ").pop();
    });
  });
});
