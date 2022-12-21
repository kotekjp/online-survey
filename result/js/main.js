const GOOGLE_FORM_URL = "https://example.com"

const reportButton = document.getElementById("report-button");
reportButton.addEventListener("click", () => {
	window.location.href = GOOGLE_FORM_URL;
});

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("count")) {
	console.log("error occurred: no parameter")
}
const count = searchParams.get("count");

const resultCountElement = document.getElementById("result-count");
resultCountElement.textContent = count;