// ==UserScript==
// @name         Duolingo Solver
// @namespace    https://www.duolingo.com/practice
// @version      0.1
// @description  Automaically solves failable Duolingo lessons.
// @author       Noya
// @match        https://*.duolingo.com/practice/
// @include      https://*.duolingo.com/practice/*
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @website      https://github.com/ZykeDev/duolingo-solver/
// @require      GM_getResourceText
// ==/UserScript==


// possible [at]match regex /https?:\/\/duolingo\.com\/.*/


let dict = {};
let translationClassname = "_2qRu2";
let challengeHeader = "challenge-header"
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
        let headerList = document.querySelectorAll("[data-test='"+ challengeHeader +"']") != null;

        if (headerList.length == 0) {
           console.log("loading");
           alert("loading");
       }
       else {
           console.log("loaded");
           alert("loaded");
           clearInterval(intervalId);
           //analyzeQuestion();
       }
       headerList = null;

    }, 5000);

}

main();

