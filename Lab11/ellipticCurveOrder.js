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

function checkIfPointBelongsToCurve(x, y, a = 1, b = 1) {
  const rhs = (Math.pow(x, 3) + a * x + b) % mod; // Права частина рівняння: x^3 + ax + b (mod p)
  const lhs = Math.pow(y, 2) % mod; // Ліва частина рівняння: y^2 (mod p)

  if (rhs !== lhs) throw new Error(`Точка(x=${x}, y=${y}) не належить кривій`);
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

    if (P !== "O") {
      checkIfPointBelongsToCurve(x, y);
    }

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
      if (result !== "O") checkIfPointBelongsToCurve(result[0], result[1]);
    }
    addend = addPoints(addend, addend, a, p); // Подвоєння точки
    if (addend !== "O") checkIfPointBelongsToCurve(addend[0], addend[1]);
    k >>= 1; // Ділення на 2
  }

  return result;
}

// Тестуємо:
const a = 1; // Коефіцієнт a в рівнянні
const b = 1; // Коефіцієнт b в рівнянні
const mod = 23; // Модуль
const G = [17, 20]; // Базова точка

checkIfPointBelongsToCurve(G[0], G[1]);

//const k = 63; // число
// const kPB = multiplyPoint(k, G, a, mod);
//checkIfPointBelongsToCurve(kPB[0], kPB[1]);
// console.log(`k × G = (${kPB[0]}, ${kPB[1]})`);

const order = findOrder(G, a, b, mod);
console.log(`Порядок точки G = (${G[0]}, ${G[1]}) дорівнює:`, order);

module.exports = {
  findOrder,
};
