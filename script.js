const helloButton = document.querySelector("#hello-button");
const statusMessage = document.querySelector("#status-message");

if (helloButton && statusMessage) {
  helloButton.addEventListener("click", () => {
    statusMessage.textContent =
      "Studio link is live. Next step: swap this for your real contact or social action.";
  });
}
