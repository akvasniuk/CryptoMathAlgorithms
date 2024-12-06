const { elGamal } = require("./elGamal.js");

test("Messages should be equal", () => {
  const {
    message: message1,
    decryptedMessage: decryptedMessage1
  } = elGamal();
  const {
    message: message2,
    decryptedMessage: decryptedMessage2
  } = elGamal();
  const {
    message: message3,
    decryptedMessage: decryptedMessage3
  } = elGamal();

  expect(message1).toEqual(decryptedMessage1);
  expect(message2).toEqual(decryptedMessage2);
  expect(message3).toEqual(decryptedMessage3);
});
