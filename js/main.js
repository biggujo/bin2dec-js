const form = document.getElementById("radix-form");

const inputRadixSelectEl = document.getElementById("radix-input-number");
const outputRadixSelectEl = document.getElementById("radix-output-number");

const inputRadixInputEl = document.getElementById("radix-input-input");
const outputRadixInputEl = document.getElementById("radix-output-input");

const buttonSwapAllValues = document.getElementById("radix-swap-values");

const MIN_RADIX = 2;
const MAX_RADIX = 16;

let currentInputRadix = 10;
let currentOutputRadix = 16;

const convertToRadix = ({ number, inRadix, outRadix }) => {
  return parseInt(number, inRadix).toString(outRadix).toUpperCase();
};

const addOptions = (selectElement, minNumber, maxNumber) => {
  for (let i = minNumber; i <= maxNumber; i++) {
    const currentOption = document.createElement("option");
    currentOption.textContent = i;

    selectElement.appendChild(currentOption);
  }
};

const setResult = () => {
  const MAX_IN_LEN = 13;

  if (inputRadixInputEl.value === "") {
    outputRadixInputEl.value = "";
    return;
  }

  if (inputRadixInputEl.length > MAX_IN_LEN) {
    inputRadixInputEl.value = inputRadixInputEl.value.slice(0, MAX_IN_LEN);
  }

  const originalValue = inputRadixInputEl.value;

  const resultNumber = convertToRadix({
    number: originalValue,
    inRadix: currentInputRadix,
    outRadix: currentOutputRadix,
  });

  const revertedNumber = convertToRadix({
    number: resultNumber,
    inRadix: currentOutputRadix,
    outRadix: currentInputRadix,
  });

  if (revertedNumber !== originalValue) {
    outputRadixInputEl.value = "---";
    return;
  }

  if (revertedNumber === originalValue) {
    outputRadixInputEl.value = resultNumber;
  }
};

const updateRadixValues = () => {
  inputRadixSelectEl.value = currentInputRadix;
  outputRadixSelectEl.value = currentOutputRadix;
};

const handleRadixChange = (event) => {
  event.currentTarget.blur();

  setResult();
};

addOptions(inputRadixSelectEl, MIN_RADIX, MAX_RADIX);
addOptions(outputRadixSelectEl, MIN_RADIX, MAX_RADIX);

updateRadixValues();

inputRadixSelectEl.addEventListener("change", handleRadixChange);
outputRadixSelectEl.addEventListener("change", handleRadixChange);

inputRadixSelectEl.addEventListener("change", () => {
  currentInputRadix = inputRadixSelectEl.value;

  setResult();
});

outputRadixSelectEl.addEventListener("change", () => {
  currentOutputRadix = outputRadixSelectEl.value;

  setResult();
});

inputRadixInputEl.addEventListener("input", setResult);

// Autofocus input

document
  .querySelector("[data-js-block-input]")
  .addEventListener("click", () => {
    if (document.activeElement !== inputRadixSelectEl) {
      inputRadixInputEl.focus();
    }
  });

outputRadixInputEl.addEventListener("click", () => {
  const savedValue = outputRadixInputEl.value;

  if (!savedValue.includes("-") && savedValue.length > 0) {
    setTimeout(() => {
      outputRadixInputEl.value = "COPIED!";
      navigator.clipboard.writeText(savedValue);
    }, 0);

    setTimeout(() => {
      outputRadixInputEl.value = savedValue;
    }, 1000);
  }

  outputRadixInputEl.blur();
});

buttonSwapAllValues.addEventListener("click", (event) => {
  event.currentTarget.blur();

  let tmp = currentInputRadix;
  currentInputRadix = currentOutputRadix;
  currentOutputRadix = tmp;

  updateRadixValues();

  tmp = inputRadixInputEl.value;
  inputRadixInputEl.value = outputRadixInputEl.value;
  outputRadixInputEl.value = tmp;
});
