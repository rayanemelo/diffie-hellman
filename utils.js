import { isPrimeNumber } from './numero-primo.js';
import { calcularModExp } from './mod-exp.js';

export function gerarRaiz(p) {
  if (!isPrimeNumber(p)) {
    throw new Error('O número deve ser primo.');
  }

  let g;

  do {
    g = Math.floor(Math.random() * (p - 2)) + 2;
  } while (!isPrimitiveRoot(g, p));

  return g;
}

export function isPrimitiveRoot(g, p) {
  const phi = p - 1;
  const factors = getPrimeFactors(phi);

  for (const factor of factors) {
    const exponent = phi / factor;
    if (calcularModExp(g, exponent, p) === 1) {
      return false;
    }
  }

  return true;
}

export function getPrimeFactors(n) {
  const factors = new Set();
  let d = 2;

  while (d * d <= n) {
    while (n % d === 0) {
      factors.add(d);
      n /= d;
    }
    d++;
  }

  if (n > 1) {
    factors.add(n);
  }

  return Array.from(factors);
}
