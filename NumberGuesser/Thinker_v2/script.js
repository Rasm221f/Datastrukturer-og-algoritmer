"use strict";

window.addEventListener("DOMContentLoaded", main);

let attempts = 0;
let currentGuess = null;
let running = false;

// binary search bounds
let lowBound = 1;
let highBound = 100;

let guessEl, attemptsEl, historyEl;
let btnLow, btnHigh, btnCorrect, btnRestart;

function main(){
  guessEl    = document.getElementById("guessDisplay");
  attemptsEl = document.getElementById("attempts");
  historyEl  = document.getElementById("history");

  btnLow     = document.getElementById("btn_low");
  btnHigh    = document.getElementById("btn_high");
  btnCorrect = document.getElementById("btn_correct");
  btnRestart = document.getElementById("btn_restart");

  btnLow.addEventListener("click", onTooLow);
  btnHigh.addEventListener("click", onTooHigh);
  btnCorrect.addEventListener("click", onCorrect);
  btnRestart.addEventListener("click", startNewRound);

  // Start første runde
  startNewRound();
}

function startNewRound(){
  attempts = 0;
  currentGuess = null;
  running = true;

  // reset bounds (1-100 like before)
  lowBound = 1;
  highBound = 100;

  attemptsEl.textContent = "0";
  guessEl.textContent = "—";
  historyEl.innerHTML = "";

  enableGuessButtons(true);
  makeNewGuess();
}

function enableGuessButtons(on){
  btnLow.disabled = !on;
  btnHigh.disabled = !on;
  btnCorrect.disabled = !on;
}

function makeNewGuess(){
  if (!running) return;

  // If bounds are invalid, we can't continue — it's a contradiction
  if (lowBound > highBound) {
    running = false;
    enableGuessButtons(false);
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Ups! Der er opstået en modsigelse i dine svar.</strong>
      <span class="tag">Interval tomt: [${lowBound}, ${highBound}]</span>
    `;
    historyEl.insertAdjacentElement("afterbegin", li);
    guessEl.textContent = "×";
    return;
  }

  currentGuess = getComputerGuess(); // midpoint
  attempts++;
  attemptsEl.textContent = String(attempts);
  displayGuess(currentGuess);
}

function getComputerGuess(){
  // midtpunkt (gulv) — klassisk binærsøgning
  return Math.floor((lowBound + highBound) / 2);
}

function displayGuess(n){
  guessEl.textContent = n;
}

function addHistoryLine(guess, verdict){
  const li = document.createElement("li");
  const label = document.createElement("span");
  label.textContent = `Mit gæt: ${guess}`;

  const tag = document.createElement("span");
  tag.className = "tag";
  if (verdict === "low"){ tag.textContent = "For lavt"; tag.classList.add("tag-low"); }
  if (verdict === "high"){ tag.textContent = "For højt"; tag.classList.add("tag-high"); }
  if (verdict === "correct"){ tag.textContent = "Korrekt"; tag.classList.add("tag-correct"); }

  // Vis det nuværende interval for gennemsigtighed
  const range = document.createElement("span");
  range.className = "tag";
  range.textContent = `Interval: [${lowBound}, ${highBound}]`;

  li.append(label, tag, range);
  historyEl.insertAdjacentElement("afterbegin", li);
}

function onTooLow(){
  if (!running) return;

  // Gættet var for lavt → løft nedre grænse
  // Det rigtige tal kan ikke være det gættede, så +1
  lowBound = currentGuess + 1;
  addHistoryLine(currentGuess, "low");
  makeNewGuess();
}

function onTooHigh(){
  if (!running) return;

  // Gættet var for højt → sænk øvre grænse
  // Det rigtige tal kan ikke være det gættede, så -1
  highBound = currentGuess - 1;
  addHistoryLine(currentGuess, "high");
  makeNewGuess();
}

function onCorrect(){
  if (!running) return;

  addHistoryLine(currentGuess, "correct");
  running = false;
  enableGuessButtons(false);

  const winLine = document.createElement("li");
  winLine.innerHTML = `
    <strong>Jeg gættede det! Tallet var ${currentGuess}.</strong>
    <span class="tag tag-correct">Brugte ${attempts} forsøg</span>
  `;
  historyEl.insertAdjacentElement("afterbegin", winLine);
}
