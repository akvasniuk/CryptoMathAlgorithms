const { diffieHellman } = require("./diffieHellman.js");

test("Keys should be equal", () => {
  const {
    aliceSharedSecret: aliceSharedSecret1,
    bobSharedSecret: bobSharedSecret1,
  } = diffieHellman();
  const {
    aliceSharedSecret: aliceSharedSecret2,
    bobSharedSecret: bobSharedSecret2,
  } = diffieHellman();
  const {
    aliceSharedSecret: aliceSharedSecret3,
    bobSharedSecret: bobSharedSecret3,
  } = diffieHellman();

  expect(aliceSharedSecret1).toEqual(bobSharedSecret1);
  expect(aliceSharedSecret2).toEqual(bobSharedSecret2);
  expect(aliceSharedSecret3).toEqual(bobSharedSecret3);
});
