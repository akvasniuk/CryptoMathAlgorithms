// Функція для обчислення степеня по модулю
function modPow(base, exp, mod) {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
}

function millerRabin(p, k) {
  if (p <= 3n) return { isPrime: p > 1n, probability: 1.0 };
  if (p % 2n === 0n) return { isPrime: false, probability: 0.0 };

  let r = 0n;
  let d = p - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

  function isComposite(a) {
    let x = modPow(a, d, p);
    if (x === 1n || x === p - 1n) return false;

    for (let i = 1n; i < r; i++) {
      x = (x * x) % p;
      if (x === p - 1n) return false;
    }
    return true;
  }

  function randomBigIntRange(min, max) {
    const range = max - min + 1n;
    const bits = range.toString(2).length; // Кількість бітів для представлення діапазону
    let rand;
    do {
      rand = BigInt(
        "0b" +
          Array(bits)
            .fill()
            .map(() => (Math.random() < 0.5 ? "0" : "1"))
            .join("")
      );
    } while (rand >= range);
    return min + rand;
  }

  for (let i = 0; i < k; i++) {
    const a = randomBigIntRange(2n, p - 2n); // Генеруємо a в діапазоні [2, p-2]
    if (isComposite(a)) return { isPrime: false, probability: 0.0 };
  }

  const probability = 1 - 1 / 2 ** k;
  return { isPrime: true, probability: probability };
}

// Генерація ключів
function generateKeys(bits) {
  // Генерація простого числа p
  const p = generateSafePrime(bits);
  const g = findPrimitiveRoot(p);

  // Генерація приватного ключа
  const privateKey = generatePrivateKey(p);

  // Генерація публічного ключа
  const publicKey = modPow(g, privateKey, p);

  return { p, g, privateKey, publicKey };
}

// Шифрування
function encrypt(message, publicKey, g, p) {
  const k = generatePrivateKey(p - 1n); // Випадкове значення k (1 < k < p-1)
  const a = modPow(g, k, p); // Перший компонент шифротексту a = g^k mod p
  const b = (modPow(publicKey, k, p) * message) % p; // Другий компонент шифротексту b = y^k * M mod p
  return { a, b, k };
}

// Розшифрування
function decrypt(ciphertext, privateKey, p) {
  const { a, b } = ciphertext;
  const ax = modPow(a, privateKey, p); // Відновлення спільного секрету a^x mod p
  const axInverse = modInverse(ax, p); // Обернене значення секрету (a^x)^(-1) mod p
  const message = (b * axInverse) % p; // Розшифроване повідомлення M = b * (a^x)^(-1) mod p
  return message;
}

function modInverse(a, p) {
  let m0 = p,
    t,
    q;
  let x0 = 0n,
    x1 = 1n;

  if (p === 1n) return 0n;

  while (a > 1n) {
    q = a / p;
    t = p;

    p = a % p;
    a = t;
    t = x0;

    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0n) x1 += m0;
  return x1;
}

// Допоміжні функції
function generateSafePrime(bits) {
  const min = 2n ** BigInt(bits - 1);
  const max = 2n ** BigInt(bits) - 1n;

  function randomBigInt(min, max) {
    const range = max - min + 1n;
    const bits = range.toString(2).length; // Кількість бітів для представлення діапазону
    let rand;
    do {
      rand = BigInt(
        "0b" +
          Array(bits)
            .fill()
            .map(() => (Math.random() < 0.5 ? "0" : "1"))
            .join("")
      );
    } while (rand >= range);
    return min + rand;
  }

  while (true) {
    const q = randomBigInt(min / 2n, max / 2n); // q має бути простим
    const p = 2n * q + 1n;

    if (millerRabin(q, 5).isPrime && millerRabin(p, 5).isPrime) {
      return p;
    }
  }
}

// Перевірка на примітивний корінь
function isPrimitiveRoot(g, p) {
  const q = (p - 1n) / 2n;
  if (modPow(g, q, p) === 1n) return false;
  return modPow(g, p - 1n, p) === 1n;
}

function isGenerator(g, p) {
  const seen = new Set(); // Для збереження унікальних елементів G

  // Генеруємо всі g^i mod p для i від 0 до p-1
  for (let i = 0n; i < p - 1n; i++) {
    const value = modPow(g, i, p);
    if (seen.has(value)) {
      return false; // Якщо елемент повторюється, g не є генератором
    }
    seen.add(value);
  }

  // Перевіряємо, чи G містить рівно p-1 унікальний елемент
  return seen.size === Number(p - 1n);
}

// Генерація g
function findPrimitiveRoot(p) {
  for (let g = 2n; g < p; g++) {
    if (isPrimitiveRoot(g, p) && isGenerator(g, p)) return g;
  }
  return null; // Якщо g не знайдено
}

function generatePrivateKey(p) {
  return BigInt(Math.floor(Math.random() * Number(p - 2n))) + 1n;
}

// Демонстрація
function elGamal() {
  const bits = 24; // Розмір простого числа
  const keys = generateKeys(bits);

  console.log("Згенеровані ключі:");
  console.log("p:", keys.p.toString());
  console.log("g:", keys.g.toString());
  console.log("Приватний ключ:", keys.privateKey.toString());
  console.log("Публічний ключ:", keys.publicKey.toString());

  const message = 12345n; // Повідомлення для шифрування
  console.log("\nПовідомлення:", message.toString());

  // Шифрування
  const ciphertext = encrypt(message, keys.publicKey, keys.g, keys.p);
  console.log("\nШифротекст:");
  console.log("Випадкове k: " + ciphertext.k.toString());
  console.log("a:", ciphertext.a.toString());
  console.log("b:", ciphertext.b.toString());

  // Розшифрування
  const decryptedMessage = decrypt(ciphertext, keys.privateKey, keys.p);
  console.log("\nРозшифроване повідомлення:", decryptedMessage.toString());

  console.log(
    "Шифрування та розшифрування успішне:",
    message === decryptedMessage
  );

  return { message, decryptedMessage };
}

elGamal();

module.exports = {
  elGamal,
};
