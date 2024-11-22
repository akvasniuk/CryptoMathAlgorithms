// Функція Міллера-Рабіна для перевірки на простоту
function millerRabin(p, k) {
  if (p <= 3n) return { isPrime: p > 1n, probability: 1.0 };
  if (p % 2n === 0n) return { isPrime: false, probability: 0.0 };

  let r = 0n;
  let d = p - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

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

// Генерація безпечного простого числа p
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
  // Генеруємо випадкове приватне число (1 < privateKey < p-1)
  return BigInt(Math.floor(Math.random() * Number(p - 2n))) + 1n;
}

function calculatePublicKey(g, privateKey, p) {
  // Обчислюємо відкритий ключ: g^privateKey mod p
  return modPow(g, privateKey, p);
}

// Основний обмін ключами
function diffieHellman() {
  const bits = 24; // Розмір числа p у бітах
  const p = generateSafePrime(bits);
  console.log("Safe prime p:", p.toString());
  const g = findPrimitiveRoot(p);
  console.log("Primitive root g:", g.toString());

  // Генерація ключів для Аліси
  const alicePrivateKey = generatePrivateKey(p);
  const alicePublicKey = calculatePublicKey(g, alicePrivateKey, p);

  // Генерація ключів для Боба
  const bobPrivateKey = generatePrivateKey(p);
  const bobPublicKey = calculatePublicKey(g, bobPrivateKey, p);

  // Виведення результатів
  console.log("Аліса:");
  console.log("Приватний ключ:", alicePrivateKey);
  console.log("Відкритий ключ:", alicePublicKey);

  console.log("\nБоб:");
  console.log("Приватний ключ:", bobPrivateKey);
  console.log("Відкритий ключ:", bobPublicKey);

  // Обчислення спільного секрету
  const aliceSharedSecret = modPow(bobPublicKey, alicePrivateKey, p);
  const bobSharedSecret = modPow(alicePublicKey, bobPrivateKey, p);

  console.log("\nСпільний секрет:");
  console.log("Вирахуваний Алісою:", aliceSharedSecret);
  console.log("Вирахуваний Бобом:", bobSharedSecret);
  console.log(
    "Спільний секрет збігається:",
    aliceSharedSecret === bobSharedSecret
  );
  return { aliceSharedSecret, bobSharedSecret };
}

// Допоміжна функція modPow
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

// Виконання протоколу
diffieHellman();

module.exports = {
    diffieHellman
}