/*
 * The NRIC/FIN Validation is largely based on this validator: https://samliew.com/singapore-nric-validator
 * If you wish to generate a valid NRIC for usage, please visit: https://samliew.com/nric-generator
 */
/*
 * The NRIC/FIN Validation is largely based on this validator: https://samliew.com/singapore-nric-validator
 * If you wish to generate a valid NRIC for usage, please visit: https://samliew.com/nric-generator
 */

const validateNric = (nricFinStr: string) => {
  if (nricFinStr.length !== 9) return false;

  const nricFin = nricFinStr.toUpperCase();

  const nricFinArr: any[] = [];
  for (let i = 0; i < 9; i += 1) {
    nricFinArr[i] = nricFin.charAt(i);
  }

  // Multiply each of the digits by the respective weights
  nricFinArr[1] = parseInt(nricFinArr[1], 10) * 2;
  nricFinArr[2] = parseInt(nricFinArr[2], 10) * 7;
  nricFinArr[3] = parseInt(nricFinArr[3], 10) * 6;
  nricFinArr[4] = parseInt(nricFinArr[4], 10) * 5;
  nricFinArr[5] = parseInt(nricFinArr[5], 10) * 4;
  nricFinArr[6] = parseInt(nricFinArr[6], 10) * 3;
  nricFinArr[7] = parseInt(nricFinArr[7], 10) * 2;

  // Calculate total, offset based on first character, and modulus 11
  let weight = 0;
  for (let i = 1; i < 8; i += 1) {
    weight += nricFinArr[i];
  }
  const firstLetter = nricFinArr[0];

  let offset = 0;
  switch (firstLetter) {
    case "T":
    case "G":
      offset = 4;
      break;
    case "M":
      offset = 3;
      break;
  }

  let tempIndex = (offset + weight) % 11;
  // If first character is M, rotate the index
  if (firstLetter === "M") {
    tempIndex = 10 - tempIndex;
  }

  // The Checksum Table - determins the last letter on the first letter
  const ST = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
  const FG = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];
  const M = ["K", "L", "J", "N", "P", "Q", "R", "T", "U", "W", "X"];

  let lastLetter = "";
  switch (firstLetter) {
    case "S":
    case "T":
      lastLetter = ST[tempIndex];
      break;
    case "F":
    case "G":
      lastLetter = FG[tempIndex];
      break;
    case "M":
      lastLetter = M[tempIndex];
      break;
  }

  return nricFinArr[8] === lastLetter;
};

export default validateNric;
