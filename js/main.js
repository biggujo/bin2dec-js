const inputFieldBinRef = document.getElementById("input-bin");
const outputFieldDecRef = document.getElementById("output-dec");

const btnToCalculateRef = document.getElementById("btn-submit");

const convertBinaryToDecimal = (binaryNumberAsString) => {
  return binaryNumberAsString
    .split("")
    .reduce(
      (decimalAsAccumulator, currentCharOfBinary, index, originalString) =>
        (decimalAsAccumulator +=
          currentCharOfBinary * Math.pow(2, originalString.length - index - 1)),
      0
    );
};

const isStringABinaryNumber = (binaryNumberString) => {
  // * From start to end, find multiple occurrences of 0 and 1
  const regex = /^[01]+$/;

  return regex.test(binaryNumberString);
};

btnToCalculateRef.addEventListener("click", () => {
  const binaryValueFromInput = inputFieldBinRef.value;

  // * If there correct decimal value
  if (isStringABinaryNumber(binaryValueFromInput)) {
    const decimalValueConverted = convertBinaryToDecimal(binaryValueFromInput);

    outputFieldDecRef.value = decimalValueConverted;
  } else alert("Only such symbols are allowed: 0, 1");
});
