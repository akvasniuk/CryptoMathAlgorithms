function modInverse(a, mod) {
  // Знаходимо обернений елемент до a mod p за допомогою розширеного алгоритму Евкліда
  let m0 = mod,
    t,
    q;
  let x0 = 0,
    x1 = 1;

  if (mod === 1) return 0;

  while (a > 1) {
    q = Math.floor(a / mod); // Частка
    t = mod;

    mod = a % mod;
    a = t; // Оновлюємо a і mod
    t = x0;

    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) x1 += m0;

  return x1;
}

function addPoints(P, Q, a, mod) {
  if (P === "O") return Q; // Якщо P - нейтральний елемент
  if (Q === "O") return P; // Якщо Q - нейтральний елемент

  const [x1, y1] = P;
  const [x2, y2] = Q;

  let m;
  let x3, y3;
  let numerator, denominator;

  if (x1 === x2 && y1 === y2) {
    // Якщо P == Q, обчислюємо нахил m для подвоєння
    numerator = 3 * x1 * x1 + a;
    denominator = 2 * y1;
    while (numerator < 0) numerator += mod;
    while (denominator < 0) denominator += mod;

    denominator = modInverse(denominator, mod);
    m = (numerator * denominator) % mod;

    // Обчислюємо координати нового x і y
    x3 = (m * m - 2 * x1) % mod;
    y3 = (-m * (x3 - x1) - y1) % mod;
  } else if (x1 !== x2) {
    // Якщо P != Q, обчислюємо нахил m
    numerator = y1 - y2;
    denominator = x1 - x2;
    while (numerator < 0) numerator += mod;
    while (denominator < 0) denominator += mod;

    denominator = modInverse(denominator, mod);
    m = (numerator * denominator) % mod;

    while (m < 0) m += mod;

    // Обчислюємо координати нового x і y
    x3 = (m * m - x1 - x2) % mod;
    y3 = (-m * (x3 - x1) - y1) % mod;
  } else {
    return "O"; // Точка на нескінченності
  }

  while (x3 < 0) x3 += mod;
  while (y3 < 0) y3 += mod;

  return [x3, y3];
}

function findOrder(G, a, b, mod) {
  let P = G;
  const O = "O"; // Нейтральний елемент
  let order = 1;
  console.log(order + "G = (" + G[0] + "," + G[1] + ")");

  while (true) {
    P = addPoints(P, G, a, mod);
    const [x, y] = P;
    order++;
    console.log(order + "G = (" + x + "," + y + ")");

    if (P === "O") {
      break;
    }
  }

  return order;
}

// Множення точки на скаляр
function multiplyPoint(k, P, a, p) {
  let result = "O"; // Нульова точка
  let addend = P;

  while (k > 0) {
    if (k & 1) {
      result = addPoints(result, addend, a, p);
    }
    addend = addPoints(addend, addend, a, p); // Подвоєння точки
    k >>= 1; // Ділення на 2
  }

  return result;
}

// Функція для шифрування повідомлення
function encryptMessage(Pm, k, PB, G, a, mod) {
  // k × G
  const kG = multiplyPoint(k, G, a, mod);
  // Pm + k × PB
  const kPB = multiplyPoint(k, PB, a, mod);
  const C2 = addPoints(Pm, kPB, a, mod);

  return { C1: kG, C2: C2 };
}

// Функція для розшифрування повідомлення
function decryptMessage(C1, C2, nB, a, mod) {
  // nB × C1
  const nBC1 = multiplyPoint(nB, C1, a, mod);
  // Обернення nB × C1
  const inverseNBC1 = [nBC1[0], (-nBC1[1] + mod) % mod];
  // Pm = C2 - (nB × C1)
  const Pm = addPoints(C2, inverseNBC1, a, mod);

  return Pm;
}

// Параметри еліптичної кривої
const a = 1; // Коефіцієнт a в рівнянні
const b = 1; // Коефіцієнт b в рівнянні
const mod = 23; // Модуль p
const G = [17, 20]; // Генераторна точка

// Випадкове число k для шифрування
const k = 15;

// Закритий і відкритий ключ
const nB = 6; // Закритий ключ B
const PB = multiplyPoint(nB, G, a, mod); // Відкритий ключ B

console.log(" a = " + a + " b = " + b + " p = " + mod 
  + " G = (" + G + ") " + " закритий ключ B = " + nB 
  + " випадкове число k = " + k);

// Повідомлення Pm, яке потрібно зашифрувати
const Pm = [15, 18]; // Повідомлення як точка на кривій
console.log("Повідомлення для шифрування: (" + Pm + ")");

// Шифрування
const { C1, C2 } = encryptMessage(Pm, k, PB, G, a, mod);
console.log("Зашифроване повідомлення:");
console.log("C1 = (" + C1[0] + ", " + C1[1] + ")");
console.log("C2 = (" + C2[0] + ", " + C2[1] + ")");

// Розшифрування
const decryptedPm = decryptMessage(C1, C2, nB, a, mod);
console.log("Розшифроване повідомлення:");
console.log("Pm = (" + decryptedPm[0] + ", " + decryptedPm[1] + ")");

module.exports = {
  encryptMessage,
  decryptMessage,
  multiplyPoint
}