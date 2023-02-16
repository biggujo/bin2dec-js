const inputFieldBinRef = document.getElementById("input-input");
const outputFieldDecRef = document.getElementById("output-input");

const btnToCalculateRef = document.getElementById("btn-submit");

const createDropdownWithRowOfNumbersEl = (
  minNumber,
  maxNumber,
  defaultValue,
  htmlID
) => {
  const dropdownListRef = document.createElement("select");

  dropdownListRef.id = htmlID;
  dropdownListRef.classList.add("dropdown");

  for (let i = minNumber; i <= maxNumber; i++) {
    const optionRadix = document.createElement("option");
    optionRadix.textContent = i;

    if (i === defaultValue) {
      optionRadix.selected = "selected";
    }

    dropdownListRef.appendChild(optionRadix);
  }
  return dropdownListRef;
};

// * Add dropdowns to choose a number radix
const minRadix = 2;
const maxRadix = 16;

const createParagraphEl = (givenTextContent, classArray) => {
  const paragraphEl = document.createElement("p");

  paragraphEl.classList.add(...classArray);
  paragraphEl.textContent = givenTextContent;

  return paragraphEl;
};

const dropdownMenuInputRadixEl = createDropdownWithRowOfNumbersEl(
  minRadix,
  maxRadix,
  2,
  "input-option-radix"
);

// * Create and render dropdowns
inputFieldBinRef.before(
  createParagraphEl("Radix:", ["text", "text--right-margin"]),
  dropdownMenuInputRadixEl
);

const dropdownMenuOutputRadixEl = createDropdownWithRowOfNumbersEl(
  minRadix,
  maxRadix,
  10,
  "input-option-radix"
);

outputFieldDecRef.before(
  createParagraphEl("Radix:", ["text", "text--right-margin"]),
  dropdownMenuOutputRadixEl
);

// * Add calculation on click
btnToCalculateRef.addEventListener("click", () => {
  let inputValue = inputFieldBinRef.value;
  const radixInput = Number(dropdownMenuInputRadixEl.value);
  const radixOutput = Number(dropdownMenuOutputRadixEl.value);

  const isNegative = inputValue.charAt(0) === "-";

  if (isNegative) {
    inputValue = inputValue.slice(1);
  }

  if (!parseInt(inputValue, radixInput)) {
    alert("Wrong number has been put!");
    return;
  }

  if (radixInput === radixOutput) {
    outputFieldDecRef.value = inputValue;
    return;
  }

  const result = parseInt(inputValue, radixInput).toString(radixOutput);

  outputFieldDecRef.value = isNegative ? "-" + result : result;
});
