// Функція для піднесення до степеня в GF(2^8) (швидке експоненціювання)
function gfPow(base, exp) {
  let result = 1;
  while (exp > 0) {
    if (exp & 1) result = gfMultiply(result, base); // Множимо, якщо поточний біт exp == 1
    base = gfMultiply(base, base); // Квадратуємо базу
    exp >>= 1; // Зсуваємо exp вправо
  }
  return result;
}

// Функція для знаходження оберненого елемента в GF(2^8)
function gfInverse(byte) {
  if (byte === 0) return 0; // 0 не має оберненого елемента
  return gfPow(byte, 254); // Використовуємо y^254 для оберненого
}

// функція SubBytes
function subBytes(byteArray, inverse = false) {
  if (inverse) {
    return byteArray.map(inverseSubBytes);
  }

  return byteArray.map((byte) => {
    const inverse = gfInverse(byte); // Знаходимо мультиплікативну обернену
    return affineTransform(inverse); // Афінне перетворення
  });
}

// Основна функція Inverse SubBytes
function inverseSubBytes(byte) {
  const inverseAffine = inverseAffineTransform(byte); // Зворотнє афінне перетворення
  return gfInverse(inverseAffine); // Знаходимо обернений елемент
}

// Константа нередукованого полінома для операцій в GF(2^8)
const IRREDUCIBLE_POLY = 0x11b;

// Множення в GF(2^8)
function gfMultiply(a, b) {
  let result = 0;
  while (b > 0) {
    if (b & 1) result ^= a; // Якщо біт b == 1, додаємо a до результату
    a <<= 1; // Зсуваємо a вліво
    if (a & 0x100) a ^= IRREDUCIBLE_POLY; // Якщо a перевищує 8 біт, зводимо модуль
    b >>= 1; // Зсуваємо b вправо
  }
  return result & 0xff; // Обмежуємо до 8 біт
}

// Афінне перетворення для SubBytes
function affineTransform(byte) {
  let result =
    byte ^
    ((byte << 1) | (byte >> 7)) ^
    ((byte << 2) | (byte >> 6)) ^
    ((byte << 3) | (byte >> 5)) ^
    ((byte << 4) | (byte >> 4));
  return (result ^ 0x63) & 0xff;
}

// Зворотнє афінне перетворення для Inverse SubBytes
function inverseAffineTransform(byte) {
  // Операція зворотного афінного перетворення
  const matrix = [
    [0, 1, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0],
  ];

  const additionVector = 0x05;

  const inputBits = [];
  for (let i = 7; i >= 0; i--) {
    inputBits.push((byte >> i) & 1);
  }

  const outputBits = [];
  for (let i = 0; i < 8; i++) {
    let sum = 0;
    for (let j = 0; j < 8; j++) {
      sum ^= matrix[i][j] * inputBits[j];
    }
    outputBits.push(sum);
  }

  let transformedByte = 0;
  for (let i = 0; i < 8; i++) {
    transformedByte = (transformedByte << 1) | outputBits[i];
  }

  transformedByte ^= additionVector;
  return transformedByte;
}

// Функція для обертання байта (ShiftRows)
function shiftRows(state, inverse = false) {
  const indices = inverse
  ? [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3]
  : [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11];

return indices.map((index) => state[index]);
}

// Функція для змішування стовпців (MixColumns)
function mixColumns(state) {
  const temp = [...state]; // Копія масиву для обчислень
  for (let c = 0; c < 4; c++) { // Обробляємо кожен стовпець
    const col = [
      state[c * 4],
      state[c * 4 + 1],
      state[c * 4 + 2],
      state[c * 4 + 3]
    ];

    // Множимо кожен стовпець на матрицю MixColumns
    temp[c * 4]     = gfMultiply(col[0], 2) ^ gfMultiply(col[1], 3) ^ gfMultiply(col[2], 1) ^ gfMultiply(col[3], 1);
    temp[c * 4 + 1] = gfMultiply(col[0], 1) ^ gfMultiply(col[1], 2) ^ gfMultiply(col[2], 3) ^ gfMultiply(col[3], 1);
    temp[c * 4 + 2] = gfMultiply(col[0], 1) ^ gfMultiply(col[1], 1) ^ gfMultiply(col[2], 2) ^ gfMultiply(col[3], 3);
    temp[c * 4 + 3] = gfMultiply(col[0], 3) ^ gfMultiply(col[1], 1) ^ gfMultiply(col[2], 1) ^ gfMultiply(col[3], 2);
  }

  return temp;
}

// Генерація RCON для AES
function generateRCON() {
  const rcon = [];
  let value = 0x01; // Початкове значення
  for (let i = 0; i < 10; i++) {
    rcon.push(value);
    value = gfMultiply(value, 2); // Множимо на 2 в GF(2^8)
  }
  return rcon;
}

const RCON = generateRCON();

// Функція для розширення ключа з використанням RCON
function keyExpansion(key) {
  let expandedKey = [...key];

  for (let i = 4; i < 44; i++) {
    // 44 це максимальна кількість елементів для AES-128 (4 * 11)
    let temp = expandedKey.slice(-4); // Беремо останні 4 байти

    if (i % 4 === 0) {
      temp = rotWord(temp); // Обертання слова
      temp = subBytes(temp); // Заміну за S-box
      temp[0] ^= RCON[Math.floor(i / 4) - 1]; // XOR з RCON
    }

    // XOR з попередніми 4 байтами
    for (let j = 0; j < 4; j++) {
      temp[j] ^= expandedKey[expandedKey.length - 16 + j];
    }

    expandedKey.push(...temp); // Додаємо отримане значення до розширеного ключа
  }

  return expandedKey;
}

// Обертання слова (для підготовки ключа)
function rotWord(word) {
  return [word[1], word[2], word[3], word[0]];
}

// Функція для додавання раундового ключа (AddRoundKey)
function addRoundKey(state, roundKey) {
  return state.map((byte, i) => byte ^ roundKey[i]);
}

function representInHex(bytes) {
  return bytes
    .map((byte) => byte.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

// Шифрування
function aesEncrypt(plaintext, key) {
  const expandedKey = keyExpansion(key);
  let roundKeys = [];
  for (let i = 0; i < 11; i++) {
    roundKeys.push(expandedKey.slice(i * 16, i * 16 + 16));
  }
  
  console.log("Keys: ");
  roundKeys.forEach(key => console.log(representInHex(key)));
  console.log();

  let state = plaintext.slice();

  state = addRoundKey(state, roundKeys[0]);

  // 9 раундів
  for (let round = 1; round <= 9; round++) {
    console.log("Input for Round " + round + ": " + representInHex(state));
    state = subBytes(state);
    console.log("suBytes for Round " + round + ": " + representInHex(state));
    state = shiftRows(state);
    console.log("shiftRow for Round " + round + ": " + representInHex(state));
    state = mixColumns(state);
    console.log("mixColumns for Round " + round + ": " + representInHex(state));
    console.log("subkey for Round : " + round + ": "  + representInHex(roundKeys[round]));
    state = addRoundKey(state, roundKeys[round]);
    console.log("addRoundKey for Round " + round + ": " + representInHex(state) + "\n");
  }

  // Останній раунд (без MixColumns)
  console.log("Input for Round 10: " + representInHex(state));
  state = subBytes(state);
  console.log("suBytes for Round 10: " + representInHex(state));
  state = shiftRows(state);
  console.log("shiftRows for Round 10: "  + representInHex(state));
  console.log("subkey for Round 10: " + representInHex(roundKeys[10]));
  state = addRoundKey(state, roundKeys[10]);
  console.log("addRoundKey for Round 10: " + representInHex(state) + "\n");

  return state;
}

// Функція зворотного MixColumns
function inverseMixColumns(state) {
  const temp = [...state];
  for (let c = 0; c < 4; c++) {
    const col = [
      state[c * 4],
      state[c * 4 + 1],
      state[c * 4 + 2],
      state[c * 4 + 3],
    ];

    // Множимо на зворотну матрицю MixColumns
    temp[c * 4] =
      gfMultiply(col[0], 0x0e) ^
      gfMultiply(col[1], 0x0b) ^
      gfMultiply(col[2], 0x0d) ^
      gfMultiply(col[3], 0x09);
    temp[c * 4 + 1] =
      gfMultiply(col[0], 0x09) ^
      gfMultiply(col[1], 0x0e) ^
      gfMultiply(col[2], 0x0b) ^
      gfMultiply(col[3], 0x0d);
    temp[c * 4 + 2] =
      gfMultiply(col[0], 0x0d) ^
      gfMultiply(col[1], 0x09) ^
      gfMultiply(col[2], 0x0e) ^
      gfMultiply(col[3], 0x0b);
    temp[c * 4 + 3] =
      gfMultiply(col[0], 0x0b) ^
      gfMultiply(col[1], 0x0d) ^
      gfMultiply(col[2], 0x09) ^
      gfMultiply(col[3], 0x0e);
  }
  return temp;
}

// Дешифрування
function aesDecrypt(ciphertext, key) {
  const expandedKey = keyExpansion(key);
  let roundKeys = [];
  for (let i = 0; i < 11; i++) {
    roundKeys.push(expandedKey.slice(i * 16, i * 16 + 16));
  }

  let state = ciphertext.slice();

  // Початкове AddRoundKey з останнім раундовим ключем
  state = addRoundKey(state, roundKeys[10]);

  // 9 раундів у зворотному порядку
  for (let round = 9; round >= 1; round--) {
    state = shiftRows(state, true); // Зворотне ShiftRows
    state = subBytes(state, true); // Зворотна SubBytes
    state = addRoundKey(state, roundKeys[round]);
    state = inverseMixColumns(state); // Зворотна MixColumns
  }

  // Останній раунд (без зворотного MixColumns)
  state = shiftRows(state, true); // Зворотне ShiftRows
  state = subBytes(state, true); // Зворотна SubBytes
  state = addRoundKey(state, roundKeys[0]);

  return state;
}


// Тест
const plaintext = [
  0x32, 0x88, 0x31, 0xe0, 0x43, 0x5a, 0x31, 0x37, 0xf6, 0x30, 0x98, 0x07, 0xa8,
  0x8d, 0xa2, 0x34,
];
const key = [
  0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x97, 0x75, 0x46,
  0x31, 0x76, 0x9b,
];

const ciphertext = aesEncrypt(plaintext, key);
console.log(
  "Ciphertext: ",
  ciphertext.map((byte) => byte.toString(16).toUpperCase()).join(" ")
);

const decrypted = aesDecrypt(ciphertext, key);

console.log(
  "Decrypted plaintext: ",
  representInHex(decrypted)
);

module.exports = {
  aesDecrypt,
  aesEncrypt
}