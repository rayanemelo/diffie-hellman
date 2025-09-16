
// Verifica se número é primo
function isPrimeNumber(num) {
  if (!Number.isInteger(num) || num < 2) return false;

  for (let cont = 2; cont < num; cont++) {
    if (num % cont === 0) return false;
  }

  return true;
}

// Gera um número primo aleatório
function gerarNumeroPrimo() {
  let n;
  do {
    n = Math.floor(Math.random() * 100) + 2;
  } while (!isPrimeNumber(n));
  return n;
}

// Fatores primos de um número
function getPrimeFactors(n) {
  const factors = new Set();
  while (n % 2 === 0) {
    factors.add(2);
    n = n / 2;
  }
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
      factors.add(i);
      n = n / i;
    }
  }
  if (n > 2) factors.add(n);
  return [...factors];
}

// Verifica se g é raiz primitiva de p
function isPrimitiveRoot(g, p) {
  const phi = p - 1;
  const factors = getPrimeFactors(phi);
  for (const factor of factors) {
    if (calcularModExp(g, phi / factor, p) === 1) return false;
  }
  return true;
}

// Gera raiz primitiva de p
function gerarRaiz(p) {
  for (let g = 2; g < p; g++) {
    if (isPrimitiveRoot(g, p)) return g;
  }
  throw new Error(`Não foi possível encontrar raiz primitiva para p = ${p}`);
}

// Exponenciação modular eficiente
function calcularModExp(base, expoente, modulo) {
  let resultado = 1;
  base = base % modulo;
  while (expoente > 0) {
    if (expoente % 2 === 1) resultado = (resultado * base) % modulo;
    base = (base * base) % modulo;
    expoente = Math.floor(expoente / 2);
  }
  return resultado;
}

// Gera número secreto (a ou b)
function gerarNumeroSecreto(p) {
  return Math.floor(Math.random() * (p - 2)) + 1;
}

export {
  gerarNumeroPrimo,
  gerarRaiz,
  calcularModExp,
  gerarNumeroSecreto,
}