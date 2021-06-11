// ==UserScript==
// @name         Duolingo Solver
// @namespace    https://www.duolingo.com/practice
// @version      0.1.2
// @description  Automaically solves failable Duolingo lessons.
// @author       Noya
// @match        *://duolingo.com/*
// @include      *://*.duolingo.com/*
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @website      https://github.com/ZykeDev/duolingo-solver/
// ==/UserScript==


// possible [at]match regex /https?:\/\/duolingo\.com\/.*/

let dict = {};
let answerClassnames = "_1UqAr _1sqiF";
let translationClassname = "_2qRu2";
let challengeHeader = "challenge-header"
let practiceURLSubstring = "practice";

function getAnswerAndNext(question) {
	// Press skip
    let skip = document.querySelectorAll("[data-test='player-skip']");
    skip[0].click();

    // Read the answer
    waitThen(100, () => {
        let answer = document.querySelectorAll(answerClassnames)[0].innerText;
        dict[question] = answer;

        // Go to the next question
        let next = document.querySelectorAll("[data-test='player-next']");
        next[0].click();
    });

}


function analyzeQuestion() {
    // TODO switch to "use keyboard"

    // Read the question
  	let questionParts = document.querySelectorAll("[data-test='hint-token']");

    if (questionParts.length == 0) {
        console.log("question not found");
        return;
    }

    let question = "";

    for(let i = 0; i < questionParts.length; i++) {
        question += questionParts[i].innerText;
    }

    if (question == "") { return; }

    // Check if the question is already in the dictionary
    let qexists = dict.hasOwnProperty(question);

    if (qexists) {
        // Paste the answer into the textarea
        let textarea = document.getElementsByClassName("textarea");
        textarea[0].value = dict[question];

        // Go to the next question
        let check = document.querySelectorAll("[data-test='player-next']");
        check[0].click();
    }
    else {
        // If we don't know the answer yet, read it and add it to the dictionary
        let answer = getAnswerAndNext(question);
    }
}





function main() {
    // Wait for a practice to start
    let wait = window.setInterval(() => {
        if (!window.location.href.includes(practiceURLSubstring)) {
            console.log("waiting");
        }
        else {
            console.log("lesson started");
            clearInterval(wait);
            onLessonStart();
        }
    }, 1000);

}

function onLessonStart() {
    // Wait for the lesson to load
    let intervalId = window.setInterval(() => {
        let headerList = document.querySelectorAll("[data-test='"+ challengeHeader +"']") != null;

        if (headerList.length == 0) {
           console.log("loading");
       }
       else {
           console.log("loaded");
           clearInterval(intervalId);
           waitThen(2000, analyzeQuestion);
       }
       headerList = null;

    }, 5000);

}


function waitThen(ms, callback) {
    let wait = window.setInterval(() => {
        clearInterval(wait);
        callback();
    }, ms);
}


main();

