"use strict";


window.addEventListener("DOMContentLoaded", main);

let attempts = 0;
let currentGuess = null;
let running = false;

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
  currentGuess = getComputerGuess();   
  attempts++;
  attemptsEl.textContent = String(attempts);
  displayGuess(currentGuess);
}

function getComputerGuess(){
  return Math.floor(Math.random() * 100) + 1; 
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

  li.append(label, tag);
  historyEl.insertAdjacentElement("afterbegin", li); 
}

function onTooLow(){
  if (!running) return;
  addHistoryLine(currentGuess, "low");
  makeNewGuess();
}

function onTooHigh(){
  if (!running) return;
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
