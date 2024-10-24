const
    PC1 = [
        57, 49, 41, 33, 25, 17, 9,
        1, 58, 50, 42, 34, 26, 18,
        10, 2, 59, 51, 43, 35, 27,
        19, 11, 3, 60, 52, 44, 36,
        63, 55, 47, 39, 31, 23, 15,
        7, 62, 54, 46, 38, 30, 22,
        14, 6, 61, 53, 45, 37, 29,
        21, 13, 5, 28, 20, 12, 4
    ],
    PC2 = [
        14, 17, 11, 24, 1, 5,
        3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8,
        16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32
    ],
    IP = [
        58, 50, 42, 34, 26, 18, 10, 2,
        60, 52, 44, 36, 28, 20, 12, 4,
        62, 54, 46, 38, 30, 22, 14, 6,
        64, 56, 48, 40, 32, 24, 16, 8,
        57, 49, 41, 33, 25, 17, 9, 1,
        59, 51, 43, 35, 27, 19, 11, 3,
        61, 53, 45, 37, 29, 21, 13, 5,
        63, 55, 47, 39, 31, 23, 15, 7
    ],
    E = [
        32, 1, 2, 3, 4, 5,
        4, 5, 6, 7, 8, 9,
        8, 9, 10, 11, 12, 13,
        12, 13, 14, 15, 16, 17,
        16, 17, 18, 19, 20, 21,
        20, 21, 22, 23, 24, 25,
        24, 25, 26, 27, 28, 29,
        28, 29, 30, 31, 32, 1
    ],
    S = [
        [
            14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
            0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
            4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
            15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
        ],
        [
            15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
            3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
            0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
            13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
        ],
        [
            10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
            13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
            13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
            1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
        ],
        [
            7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
            13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
            10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
            3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
        ],
        [
            2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
            14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
            4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
            11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
        ],
        [
            12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
            10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
            9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
            4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
        ],
        [
            4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
            13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
            1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
            6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
        ],
        [
            13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
            1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
            7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
            2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
        ]
    ],
    P = [
        16, 7, 20, 21,
        29, 12, 28, 17,
        1, 15, 23, 26,
        5, 18, 31, 10,
        2, 8, 24, 14,
        32, 27, 3, 9,
        19, 13, 30, 6,
        22, 11, 4, 25
    ],
    FINAL_IP = [
        40, 8, 48, 16, 56, 24, 64, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25
    ],
    NUM_OF_LEFT_SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

// Функція для розбиття рядка на частини заданої довжини
const chunkString = (str, len) => str.match(new RegExp('.{1,' + len + '}', 'g'));

// Перетворює шістнадцятковий символ у двійковий формат (8 біт)
const hexToBin = (hex) => ("00000000" + (parseInt(hex, 16)).toString(2)).slice(-8);

// Перетворює десяткове число у двійковий формат (4 біти)
const decToBin = (dec) => ("0000" + (parseInt(dec, 10)).toString(2)).slice(-4);

// Перетворює двійковий рядок у шістнадцятковий формат
const binToHex = (bin) => parseInt(bin, 2).toString(16);

// Перетворює ключ з шістнадцяткового у двійковий формат
const bin = key => chunkString(key, 2).map(hex => hexToBin(hex)).join("");

// Функція для зсуву рядка на певну кількість позицій (ліворуч)
const shiftString = (str, shift) => str.slice(shift, str.length) + str.slice(0, shift);

// Функція для перетворення ASCII рядка у бінарний формат
const asciiToBin = (str) => {
  return str.split('').map(char => {
    return ("00000000" + char.charCodeAt(0).toString(2)).slice(-8);
  }).join('');
};

// Функція для перевірки, чи це 64-бітовий бінарний рядок
const isBinary = (str) => /^[01]{64}$/.test(str);

// Перетворення бінарного рядка в ASCII символи
const binToAscii = (binStr) => {
  return chunkString(binStr, 8).map(byte => {
    return String.fromCharCode(parseInt(byte, 2));
  }).join('');
};

// Функція для створення підключів (ключів для кожного з 16 раундів)
const keySchedule = (key) => {
  let subkeys = [];
  let perm = PC1.map(index => key[index - 1]).join(""); // Первісна перестановка ключа за таблицею PC1
  console.log("PC1 Permutation of Key: ", perm); // Ключ з 56 біт
  
  let C0 = perm.slice(0, perm.length / 2); // Ліва частина ключа
  let D0 = perm.slice(perm.length / 2); // Права частина ключа
  let prevC0 = C0, prevD0 = D0;
  
  // Генерація підключів шляхом циклічного зсуву
  NUM_OF_LEFT_SHIFTS.forEach((shift, i) => {
    C0 = shiftString(prevC0, shift); // Зсув лівої частини
    D0 = shiftString(prevD0, shift); // Зсув правої частини
    prevC0 = C0;
    prevD0 = D0;
    
    let pair = C0 + D0; // Об'єднання лівої і правої частини
    let subkey = PC2.map(index => pair[index - 1]).join("");  // Формування підключа через перестановку PC2
    subkeys.push(subkey); // Додавання підключа до списку
    console.log(`Subkey ${i + 1}: ${subkey}`);
  });

  return subkeys; // Повернення масиву підключів
};

// Функція для розширення блоку з 32 біт до 48 біт (для подальшої обробки)
const expandBlock = block => E.map(index => block[index - 1]).join("");

// Функція для побітового XOR двох рядків (однакової довжини)
const stringXOR = (str1, str2, len) => {
  let xor = Array(len); // Масив для збереження результату XOR
  for (let i = 0; i < len; i++) {
    xor[i] = (str1[i] === str2[i] ? 0 : 1); // Побітове порівняння
  }
  return xor.join(""); // Повернення результату як рядка
}

// Функція для обчислення результату з S-блоків (підстановка після XOR)
const sBoxOutput = bits => {
  return chunkString(bits, 6).map((group, sBox) => { // Розбиття рядка на 6-бітові групи
    let row = parseInt(group[0] + group[5], 2); // Визначення рядка
    let col = parseInt(group.slice(1, 5), 2); // Визначення колонки
    let output = decToBin(S[sBox][16 * row + col]); // Підстановка через S-блок
    console.log(`S-Box ${sBox  + 1} Output: Row: ${row}, Col: ${col},  Value: ${output}`);
    return output;
  }).join("");
};

// Функція шифрування/дешифрування за алгоритмом DES
const des = (msg, key, subkeys) => {
  let perm = IP.map(index => msg[index - 1]).join(""); // Початкова перестановка (IP)
  console.log("Init Permutation: ", perm);

  let L0 = perm.slice(0, perm.length / 2); // Ліва частина блоку
  let R0 = perm.slice(perm.length / 2); // Права частина блоку

  let prevL0 = L0, prevR0 = R0;
  for (let i = 0; i < 16; i++) { // 16 раундів шифрування
    console.log(`\nRound ${i + 1}`);
    console.log(`L${i}: ${prevL0}`);
    console.log(`R${i}: ${prevR0}`);

    L0 = prevR0; // Ліва частина блоку оновлюється попередньою правою частиною
    let expandedR = expandBlock(prevR0); // Розширення правої частини
    console.log("Expanded R: ", expandedR);

    let xorOutput = stringXOR(subkeys[i], expandedR, 48); // XOR правої частини з підключем
    console.log("XOR with Subkey: ", xorOutput);

    let sBoxOut = sBoxOutput(xorOutput); // Підстановка через S-блоки
    let finalPerm = P.map(index => sBoxOut[index - 1]).join(""); // Перестановка після S-блоків
    R0 = stringXOR(prevL0, finalPerm, 32); // Оновлення правої частини

    console.log(`L${i + 1}: ${L0}`);
    console.log(`R${i + 1}: ${R0}`);

    prevL0 = L0;
    prevR0 = R0;
  }

  let pair = R0 + L0; // Об'єднання правої та лівої частин
  let enc = FINAL_IP.map(index => pair[index - 1]).join(""); // Фінальна перестановка (FP)
  console.log("Final Permutation: ", enc);

  return enc; // Повернення зашифрованого/розшифрованого блоку
}

// Функція для шифрування повідомлення
const encode = (msg, key) => des(msg, key, keySchedule(key));

// Функція для дешифрування повідомлення
const decode = (msg, key) => des(msg, key, keySchedule(key).reverse());

const processInput = (input, keyInput) => {
  let msgBin, keyBin;

  // Перевірка вхідного повідомлення
  if (isBinary(input)) {
    console.log("Input is a 64-bit binary string.");
    msgBin = input;
  } else if (input.length === 8) {
    console.log("Input is an 8-character ASCII string.");
    msgBin = asciiToBin(input);
  } else {
    throw new Error("Input must be either a 64-bit binary string or an 8-character ASCII string.");
  }
  // Перевірка ключа
  if (isBinary(keyInput)) {
    console.log("Key is a 64-bit binary string.");
    keyBin = keyInput;
  } else if (keyInput.length === 8) {
    console.log("Key is an 8-character ASCII string.");
    keyBin = asciiToBin(keyInput);
  } else {
    throw new Error("Key must be either a 64-bit binary string or an 8-character ASCII string.");
  }
  
  console.log("Binary Message: ", msgBin);
  console.log("Binary Key: ", keyBin);
  
  // Шифрування
  let encBin = encode(msgBin, keyBin);
  let encAscii = binToAscii(encBin);
  let encHex = chunkString(encBin, 4).map(binToHex).join("").toUpperCase();

  // Дешифрування
  console.log("\n-----------------------DECRYPTION---------------------------------\n");
  let decBin = decode(encBin, keyBin);
  let decMsg = binToAscii(decBin);

  console.log("Encrypted Message (Hex): ", encHex);
  console.log("Decrypted Message: ", decMsg);
}

let asciiInput = "AV2SA222";
let asciiKey = "SAd1ssda";
processInput(asciiInput, asciiKey);

// Для 64-бітового рядка і 64-бітового ключа
// let binaryInput = "0100000101000010010000110100010001000101010001100100011101001000";
// let binaryKey = "0001001100110100010101110111100110011011101111001101111111110001";
// processInput(binaryInput, binaryKey);
