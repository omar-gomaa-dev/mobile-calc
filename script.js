let display = document.getElementById("display");
let historyDiv = document.getElementById("history");

function appendValue(val) {
  display.value += val;
}
function operate(op) {
  display.value += " " + op + " ";
}
function percent() {
  display.value = eval(display.value) / 100;
  addHistory(display.value + " (percent)");
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
    addHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
function addHistory(entry) {
  let div = document.createElement("div");
  div.innerText = entry;
  historyDiv.prepend(div);
}
function clearHistory() {
  historyDiv.innerHTML = "";
}
function toggleMode() {
  document.body.classList.toggle("light-mode");
}
