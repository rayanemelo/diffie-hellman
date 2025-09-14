export function calcularModExp(base, expoente, mod) {
  if (mod === 1) return 0;

  let resultado = 1;

  base = base % mod;

  while (expoente > 0) {
    if (expoente % 2 === 1) {
      resultado = (resultado * base) % mod;
    }

    expoente = Math.floor(expoente / 2);
    base = (base * base) % mod;
  }

  return resultado;
}