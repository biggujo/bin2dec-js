const inputFieldBinRef = document.getElementById("input-input");
const outputFieldDecRef = document.getElementById("output-input");

const btnToCalculateRef = document.getElementById("btn-submit");

const isStringABinaryNumber = (binaryNumberString) => {
  // * From start to end, find multiple occurrences of 0 and 1
  const regex = /^[01]+$/;

  return regex.test(binaryNumberString);
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
  const inputValue = inputFieldBinRef.value;
  const radixInput = Number(dropdownMenuInputRadixEl.value);
  const radixOutput = Number(dropdownMenuOutputRadixEl.value);

  let result = 0;

  if (radixInput === radixOutput) {
    outputFieldDecRef.value = inputValue;
    return;
  }

  if (radixInput > 10 || radixInput > radixOutput) {
    result = parseInt(inputValue, radixInput);
    outputFieldDecRef.value = result.toString(radixOutput);
  } else {
    outputFieldDecRef.value = inputValue.toString(radixInput);
  }
});
