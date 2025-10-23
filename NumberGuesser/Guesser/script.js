"use strict";

window.addEventListener("DOMContentLoaded", main);
const number = 42;

function main(){
    console.log("JavaScript kører!");
    const guessButton = document.getElementById("btn_guess");
    guessButton.addEventListener("click", onGuessButtonClick);

    const retryButton = document.getElementById("btn_restart");
    retryButton.addEventListener("click", onRetryButtonClick);
}

function onGuessButtonClick(){
    const guess = document.getElementById("guess").valueAsNumber;
    console.log("Brugerens gæt: " + guess);
    const feedbackList = document.querySelector("ul");
    const listItem = document.createElement("li");
    if (guess > number){
        console.log("Gættet er for højt!");
        listItem.textContent = "Du gættede på " + guess + ". Det er for højt";
        feedbackList.appendChild(listItem);
    }
    else if (guess < number){
        console.log("Gættet er for lavt!");
        listItem.textContent = "Du gættede på " + guess + ". Det er for lavt";
        feedbackList.appendChild(listItem);
    }
    else {
        console.log("Tillykke! Du gættede rigtigt!");
        listItem.textContent = "Tillykke! Du gættede rigtigt!";
        feedbackList.appendChild(listItem);
    }
function onRetryButtonClick(){
    feedbackList = ""
}
} 