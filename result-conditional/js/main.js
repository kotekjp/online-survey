const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("count")) {
	console.log("error occurred: no parameter");
}
const count = searchParams.get("count");

const GOOGLE_FORM_URL =
	"https://docs.google.com/forms/d/e/1FAIpQLSe2tPYiGGYccTXyzrntHJvQgxCRneFtTtmj6D7HxuysEvVeyg/viewform?usp=sf_link&entry.562140838=" +
	count;

const reportButton = document.getElementById("report-button");
reportButton.addEventListener("click", () => {
	window.location.href = GOOGLE_FORM_URL;
});

const resultCountElement = document.getElementById("result-count");
resultCountElement.textContent = count;
