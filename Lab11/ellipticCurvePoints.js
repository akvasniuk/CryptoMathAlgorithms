function findEllipticCurvePoints(a, b, mod) {
    const points = [];

    for (let x = 0; x < mod; x++) {
        const rhs = (Math.pow(x, 3) + a * x + b) % mod; // Права частина рівняння: x^3 + ax + b (mod p)
        for (let y = 0; y < mod; y++) {
            const lhs = Math.pow(y, 2) % mod; // Ліва частина рівняння: y^2 (mod p)

            if (lhs === rhs) { // Перевірка, чи співпадають обидві частини рівняння
                points.push([x, y]);
            }
        }
    }

    return points;
}

// Використання функції:
const a = 1; // Значення a в рівнянні y^2 = x^3 + ax + b
const b = 1; // Значення b в рівнянні y^2 = x^3 + ax + b
const mod = 23; // Модуль (поле GF(mod))

const points = findEllipticCurvePoints(a, b, mod);
console.log("Точки еліптичної кривої:", points);