const { findOrder } = require("./ellipticCurveOrder.js");
const {
  decryptMessage,
  encryptMessage,
  multiplyPoint
} = require("./ellipticCurveEncryption.js");

test("Order must be equal", () => {
  const a = 1; // Коефіцієнт a в рівнянні
  const b = 1; // Коефіцієнт b в рівнянні
  const mod = 23; // Модуль
  const G = [17, 20]; // Базова точка

  const order = findOrder(G, a, b, mod);

  expect(order).toEqual(7);
});

test("Messages must be equals", () => {
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

  const Pm = [15, 18]; // Повідомлення як точка на кривій
  
  const { C1, C2 } = encryptMessage(Pm, k, PB, G, a, mod);
  const decryptedPm = decryptMessage(C1, C2, nB, a, mod);

  expect(decryptedPm).toEqual(Pm);
});
