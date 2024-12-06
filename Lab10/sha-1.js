function sha1(message) {
    // Допоміжні функції

    // Функція для циклічного зсуву числа вліво
    function rotateLeft(n, s) {
        return (n << s) | (n >>> (32 - s));
    }

    // Функція для перетворення числа у шістнадцятковий рядок
    function toHexStr(n) {
        let s = "", v;
        for (let i = 7; i >= 0; i--) {
            v = (n >>> (i * 4)) & 0x0f; // Отримання 4-х бітів
            s += v.toString(16);       // Перетворення у шістнадцятковий формат
        }
        return s;
    }

    // Попередня обробка (pre-processing)

    // Кодуємо повідомлення у UTF-8 для коректної роботи з текстом
    const msg = unescape(encodeURIComponent(message));
    
    const msgLength = msg.length; // Довжина повідомлення
    const words = []; // Масив для 512-бітових блоків

    // Розбиття повідомлення на 512-бітові блоки
    for (let i = 0; i < msgLength; i++) {
        words[i >> 2] |= msg.charCodeAt(i) << (24 - (i % 4) * 8);
    }

    // Додаємо біт '1' після кінця повідомлення
    words[msgLength >> 2] |= 0x80 << (24 - (msgLength % 4) * 8);

    // Додаємо початкову довжину повідомлення у бітах до кінця масиву
    words[((msgLength + 8) >> 6) * 16 + 15] = msgLength * 8;

    // Ініціалізація хеш-значень (стандартні константи)
    let H0 = 0x67452301,
        H1 = 0xEFCDAB89,
        H2 = 0x98BADCFE,
        H3 = 0x10325476,
        H4 = 0xC3D2E1F0;

    // Основний цикл алгоритму
    for (let i = 0; i < words.length; i += 16) {
        const W = new Array(80); // Робочий масив для 80 слів

        // Ініціалізуємо перші 16 слів (значення з вхідного блоку)
        for (let t = 0; t < 16; t++) {
            W[t] = words[i + t] || 0;
        }

        // Обчислюємо наступні слова (з 16 до 79) за формулою
        for (let t = 16; t < 80; t++) {
            W[t] = rotateLeft(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }

        // Ініціалізуємо тимчасові змінні
        let A = H0,
            B = H1,
            C = H2,
            D = H3,
            E = H4;

        // 80 ітерацій для кожного блоку
        for (let t = 0; t < 80; t++) {
            let f, K; // Логічна функція та константа

            // Вибір логічної функції та константи залежно від діапазону t
            if (t < 20) {
                f = (B & C) | (~B & D);
                K = 0x5A827999;
            } else if (t < 40) {
                f = B ^ C ^ D;
                K = 0x6ED9EBA1;
            } else if (t < 60) {
                f = (B & C) | (B & D) | (C & D);
                K = 0x8F1BBCDC;
            } else {
                f = B ^ C ^ D;
                K = 0xCA62C1D6;
            }

            // Основна формула для обчислення тимчасового значення
            const temp = (rotateLeft(A, 5) + f + E + W[t] + K) >>> 0;
            E = D;       // Зсув змінних
            D = C;
            C = rotateLeft(B, 30) >>> 0;
            B = A;
            A = temp;
        }

        // Оновлюємо хеш-значення
        H0 = (H0 + A) >>> 0;
        H1 = (H1 + B) >>> 0;
        H2 = (H2 + C) >>> 0;
        H3 = (H3 + D) >>> 0;
        H4 = (H4 + E) >>> 0;
    }

    // Повертаємо кінцевий хеш у вигляді рядка
    return [H0, H1, H2, H3, H4].map(toHexStr).join('');
}

// Приклад використання
const message = "SHA-1";
console.log("Message: " + message);
console.log("Hash: " + sha1(message)); // Виведе SHA-1 хеш для введеного тексту

module.exports = {
    sha1
}