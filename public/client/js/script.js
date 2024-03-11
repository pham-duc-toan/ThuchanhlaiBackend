//Chữ động trang chủ client
const textArray = "NAMESHOP".split("");
const descActiveElement = document.querySelector(".des-active");
const dau3cham = document.querySelector(".ba-cham");
const textActive = (textArray, descActiveElement, dau3cham) => {
  let currentIndex = 0;
  function insertText() {
    if (currentIndex < textArray.length) {
      descActiveElement.innerHTML += textArray[currentIndex];
      currentIndex++;
      if (currentIndex == textArray.length) {
        dau3cham.classList.add("none");
      }
      setTimeout(insertText, 500);
    } else {
      setTimeout(resetText, 1500);
    }
  }

  function resetText() {
    descActiveElement.innerHTML = "N";
    currentIndex = 1;
    dau3cham.classList.remove("none");
    setTimeout(insertText, 500);
  }

  insertText();
};
if (descActiveElement && dau3cham)
  textActive(textArray, descActiveElement, dau3cham);
//End Chữ động trang chủ client
//back filter
const backFilter = document.querySelector("[button-back]");
if (backFilter) {
  backFilter.addEventListener("click", () => {
    window.history.back();
  });
}
//end back filter
