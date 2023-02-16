const MIN_RADIX = 2;
const MAX_RADIX = 16;

const inputFieldBinRef = document.getElementById("input-input");
const outputFieldDecRef = document.getElementById("output-input");

const btnToCalculateRef = document.getElementById("btn-submit");

const convertToRadix = (number, radixInput, radixOutput) => {
  return parseInt(number, radixInput).toString(radixOutput).toUpperCase();
};

// * Create DOM dropdown list
const createDropdownWithRowOfNumbersEl = (
  minNumber,
  maxNumber,
  defaultValue,
  htmlID
) => {
  const dropdownListRef = document.createElement("select");

  dropdownListRef.id = htmlID;
  dropdownListRef.classList.add("dropdown");

  // * List of numbers [minNumber; maxNumber]
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

// * Create DOM paragraph
const createParagraphEl = (givenTextContent, classArray) => {
  const paragraphEl = document.createElement("p");

  paragraphEl.classList.add(...classArray);
  paragraphEl.textContent = givenTextContent;

  return paragraphEl;
};

// * Create dropdowns
const dropdownMenuInputRadixEl = createDropdownWithRowOfNumbersEl(
  MIN_RADIX,
  MAX_RADIX,
  2,
  "input-option-radix"
);

const dropdownMenuOutputRadixEl = createDropdownWithRowOfNumbersEl(
  MIN_RADIX,
  MAX_RADIX,
  10,
  "input-option-radix"
);

// * Render dropdowns
inputFieldBinRef.before(
  createParagraphEl("Radix:", ["text", "text--right-margin"]),
  dropdownMenuInputRadixEl
);

outputFieldDecRef.before(
  createParagraphEl("Radix:", ["text", "text--right-margin"]),
  dropdownMenuOutputRadixEl
);

// * Add calculation on click
btnToCalculateRef.addEventListener("click", () => {
  let inputValue = inputFieldBinRef.value; // let, because there can be slice of minus

  // * Dropdowns
  const radixInput = Number(dropdownMenuInputRadixEl.value);
  const radixOutput = Number(dropdownMenuOutputRadixEl.value);

  const isNegativeGiven = inputValue.charAt(0) === "-";

  if (isNegativeGiven) {
    inputValue = inputValue.slice(1);
  }

  const result = convertToRadix(inputValue, radixInput, radixOutput);

  // * Check if number is correct
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

  // * Save values
  outputFieldDecRef.value = result;

  if (isNegativeGiven) {
    outputFieldDecRef.value = "-" + outputFieldDecRef.value;
  }
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
