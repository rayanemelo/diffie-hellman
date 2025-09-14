export function isPrimeNumber(num) {
  if (!Number.isInteger(num) || num < 2) return false;

  for (let cont = 2; cont < num; cont++) {
    if (num % cont === 0) {
      return false;
    }
  }

  return true;
}

export function gerarNumeroPrimo() {
  let n;

  do {
    n = Math.floor(Math.random() * 100) + 2;
  } while (!isPrimeNumber(n));

  return n;
}