const { sha1 } = require("./sha-1.js");

test("Hash must be equal", () => {
  const hash1 = sha1("Hello, World!");
  const hash2 = sha1("Crypto");
  const hash3 = sha1("SHA-1");

  expect(hash1).toEqual("0a0a9f2a6772942557ab5355d76af442f8f65e01");
  expect(hash2).toEqual("e849494484ed2e3c1a93babc3e347d2e98ac8604");
  expect(hash3).toEqual("c571b86549e49bf223cf648388c46288c2241b5a");
});
