// ==UserScript==
// @name         Duolingo Solver
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automaically solves failable Duolingo lessons.
// @author       Noya
// @match        https://www.duolingo.com
// @icon         https://www.google.com/s2/favicons?domain=greasyfork.org
// @grant        none
// ==/UserScript==


// possible -match regex /https?:\/\/duolingo\.com\/.*/


let dict = {};
let translationClassname = "_2qRu2";
let loadingDotsClassnames = "_1uYPT _3jIlr f2zGP _18W4a xtPuL";

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
	let question = document.querySelectorAll("[data-test='hint-token']");

    // TODO if question doesnt exist, skip




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
    }
}


function main() {
    var intervalId = window.setInterval(function(){
       let dots = document.getElementsByClassName(loadingDotsClassnames);

        console.log("loading");
        if (dots == null || dots == undefined) {
            console.log("loaded");
            clearInterval(intervalId);
            analyzeQuestion();
        }

        dots = null;

    }, 5000);

}

main();

