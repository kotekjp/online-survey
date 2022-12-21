const TIMER_TIME = 60;
let currentTime = 0;
let currentCount = 0;
init();

function init() {
	initTimer();
	setInterval(runTimer, 1000);
	registerFormEventHandler();
	reset();
}

function initTimer() {
	currentTime = TIMER_TIME;
	updateDisplayTimer();
	console.log("initTimer: timer initialized!");
}

function runTimer() {
	updateTime();
	updateDisplayTimer();
}

function updateTime() {
	if (currentTime <= 0) {
		finish();
		return;
	}
	currentTime -= 1;
	console.log(`updateTime: in-code timer updated! [${currentTime}]`);
}

function updateDisplayTimer() {
	const timerMin = document.getElementById("test-timer-min");
	const timerSec = document.getElementById("test-timer-sec");
	const min = (currentTime - (currentTime % 60)) / 60;
	const sec = currentTime % 60;
	timerMin.textContent = min.toString().padStart(2, "0");
	timerSec.textContent = sec.toString().padStart(2, "0");
	console.log(`updateDisplayTimer: timer display updated! [${timerMin.textContent}:${timerSec.textContent}]`);
}

function registerFormEventHandler() {
	const form = document.getElementById("test-form");
	form.addEventListener("submit", (event) => {
		event.stopPropagation();
		event.preventDefault();
		if (!checkInput()) return;
		reset();
	});
}

function checkInput() {
	const input = document.getElementById("test-input");
	const errorMsg = document.getElementById("error-msg");
	const primHTMLElement = document.getElementById("test-question-prim-element");
	const secHTMLElement = document.getElementById("test-question-sec-element");
	const inputValue = input.value;
	const isNumber = /^[0-9]+$/g;
	if (inputValue == "") {
		input.classList.add("invalid");
		errorMsg.textContent = "空の値です。";
		console.log("input: empty value");
		return false;
	}
	if (!isNumber.test(inputValue)) {
		input.classList.add("invalid");
		errorMsg.textContent = "数字以外の文字が含まれています。";
		console.log("input: value is not number");
		return false;
	}
	if (!isValidAnswer(Number(primHTMLElement.textContent), Number(secHTMLElement.textContent), inputValue)) {
		input.classList.add("invalid");
		errorMsg.textContent = "不正解です。";
		console.log("input: invalid value");
		return false;
	}
	input.classList.remove("invalid");
	errorMsg.textContent = "";
	console.log(`input: valid value [${inputValue}]`);
	return true;
}

function isValidAnswer(primElement, secElement, answer) {
	const isValid = primElement + secElement == answer;
	return isValid;
}

function reset() {
	clearForm();
	updateQuestion();
	updateCount();

	console.log("reset: form reset!");
	return;
}

function clearForm() {
	const input = document.getElementById("test-input");
	input.value = "";

	console.log("clearForm: form cleared!");
	return;
}

function updateQuestion() {
	const primHTMLElement = document.getElementById("test-question-prim-element");
	const secHTMLElement = document.getElementById("test-question-sec-element");

	const primValue = Math.floor(Math.random() * 100) + 1;
	const secValue = Math.floor(Math.random() * 100) + 1;

	primHTMLElement.textContent = primValue;
	secHTMLElement.textContent = secValue;

	console.log("updateQuestion: question updated!");
	return;
}

function updateCount() {
	const counterElement = document.getElementById("test-counter-number");
	currentCount += 1;
	counterElement.textContent = currentCount.toString();
	console.log(`updateCount: count updated! [${currentCount.toString()}]`);
}
 
function finish() {
	window.location.href = "../result/index.html" + "?count=" + (currentCount - 1).toString();
}