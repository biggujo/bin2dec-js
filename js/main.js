const inputFieldBinRef = document.getElementById("input-input");
const outputFieldDecRef = document.getElementById("output-input");

const btnToCalculateRef = document.getElementById("btn-submit");

const convertToRadix = (number, radixInput, radixOutput) => {
  return parseInt(number, radixInput).toString(radixOutput).toUpperCase();
};

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

  const result = convertToRadix(inputValue, radixInput, radixOutput);

  if (inputValue !== convertToRadix(result, radixOutput, radixInput)) {
    setTimeout(() => {
      outputFieldDecRef.value = "WRONG NUMBER INPUT";
    }, 0);
    return;
  }

  if (radixInput === radixOutput) {
    outputFieldDecRef.value = inputValue;
    return;
  }

  outputFieldDecRef.value = isNegative ? "-" + result : result;
});

outputFieldDecRef.addEventListener("click", () => {
  const savedValue = outputFieldDecRef.value;

  if (savedValue) {
    setTimeout(() => {
      outputFieldDecRef.value = "COPIED!";
      navigator.clipboard.writeText(savedValue);
    }, 0);

    setTimeout(() => {
      outputFieldDecRef.value = savedValue;
    }, 1000);
  }
});
