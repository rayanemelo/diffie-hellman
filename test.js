import { prime, modPow } from 'bigint-crypto-utils';
import crypto from 'crypto';
console.time;

async function testarDiffieHellmanComBits(bits) {
  console.log(`\n---- Testando com ${bits} bits ----`);
  console.time(`Tempo total (${bits} bits)`);

  // 1. Gera número primo p
  console.time("Geração do número primo p");
  const p = await prime(bits);
  console.timeEnd("Geração do número primo p");

  // 2. Raiz primitiva g = 2
  const g = 2n;

  // 3. Gera número secreto privado (a, b)
  const a = BigInt(`0x${crypto.randomBytes(bits / 8).toString('hex')}`);
  const b = BigInt(`0x${crypto.randomBytes(bits / 8).toString('hex')}`);

  // 4. Calcula chaves públicas
  console.time("Cálculo das chaves públicas");
  const A = modPow(g, a, p);
  const B = modPow(g, b, p);
  console.timeEnd("Cálculo das chaves públicas");

  // 5. Calcula chave secreta compartilhada
  console.time("Cálculo da chave secreta");
  const Sa = modPow(B, a, p);
  const Sb = modPow(A, b, p);
  console.timeEnd("Cálculo da chave secreta");

  console.log("Chaves iguais:", Sa === Sb);
  console.timeEnd(`Tempo total (${bits} bits)`);
}

async function main() {
  await testarDiffieHellmanComBits(512);
  await testarDiffieHellmanComBits(1024);
  await testarDiffieHellmanComBits(2048);
}

main();
