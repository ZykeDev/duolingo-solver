// ==UserScript==
// @name         Duolingo Solver
// @namespace    https://www.duolingo.com/practice
// @version      0.1.1
// @description  Automaically solves failable Duolingo lessons.
// @author       Noya
// @match        *://duolingo.com/*
// @include      *://*.duolingo.com/*
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @website      https://github.com/ZykeDev/duolingo-solver/
// ==/UserScript==


// possible [at]match regex /https?:\/\/duolingo\.com\/.*/

let dict = {};
let translationClassname = "_2qRu2";
let challengeHeader = "challenge-header"
let practiceURLSubstring = "practice";
//let loadingDotsClassnames = "_1uYPT _3jIlr f2zGP _18W4a xtPuL";

function getAnswer(question) {
	// press skip
  let skip = document.querySelectorAll("[data-test='player-skip']");
  skip.click();

  // delay
  setTimeout(() => {
  	// open the Discuss link in an i-frame?
    let iframe = null;

  	// copy the answer
    let answer = iframe.contentWindow.document.getElementsByClassName(translationClassname).innerText;

  	// save it to a dictionary (Q - A)
    dict[question] = answer;
  }, 100)
}


function analyzeQuestion() {
    // TODO switch to "use keyboard"

    // Wait a second

  	//let questionParts = document.querySelectorAll("[data-test='hint-token']");
    let fullQuestion = document.querySelectorAll("[data-test='hint-sentence']");

    console.log(fullQuestion.length);
    // TODO if question doesnt exist, skip
/*

	let exists = dict.hasOwnProperty(question);
    alert(question);

	if (exists) {
  	   // paste A into the textarea
       var textarea = document.getElementsByClassName("textarea");
       textarea.value = dict[question];

       // press check
       let check = document.querySelectorAll("[data-test='player-next']");
       check.click();

       // if its wrong, substitute answer
       // needs a delay time
    }
    else {
  	  //getAnswer(question)
    }*/
}





function main() {
    // Wait for a practice to start
    let wait = window.setInterval(function() {
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
    let intervalId = window.setInterval(function(){
        let headerList = document.querySelectorAll("[data-test='"+ challengeHeader +"']") != null;

        if (headerList.length == 0) {
           console.log("loading");
       }
       else {
           console.log("loaded");
           clearInterval(intervalId);
           waitThen(1000, analyzeQuestion);
       }
       headerList = null;

    }, 5000);

}


function waitThen(ms, callback) {
    let wait = window.setInterval(function() {
        clearInterval(wait);
        callback();
    }, ms);
}


main();

