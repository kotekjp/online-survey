
const TIME = 30;

class Timer {
	constructor() {
		this.intervalId;
		this.time = TIME;
		return;
	}
	
	start() {
		const intervalId = setInterval(this.updateTime, 1000);
		this.intervalId = intervalId;
		console.log(`Timer [${this.intervalId}]: timer started!`)
		return;
	}

	clear() {
		clearInterval(this.intervalId);
	}
	
	updateTime() {
		if (this.time < 0) {
			this.clear();
			return;
		}
		this.time -= 1
		const timer = document.getElementById("test-timer-time");
		const timerText = String((this.time - this.time % 60) / 60) + ":" + String(this.time % 60);
		timer.textContent = timerText;
		console.log(`Timer [${this.intervalId}]: timer updated!`)
		return;
	}
}

init();

function init() {
	registerFormEventHandler();
	reset();
	// const timer = new Timer();
	// timer.start(); 
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
	// const isValid = (11 + 23 == 34);
	return isValid;
}

function reset() {
	clearForm();
	updateQuestion();

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