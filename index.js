import { calcularModExp, gerarNumeroPrimo, gerarNumeroSecreto, gerarRaiz } from './utils/index.js';
import { criarChaveAES, cifrarAES, decifrarAES } from './utils/aes-ctr.js';

function main() {
  const numPrimo = gerarNumeroPrimo(); // p
  const numRaiz = gerarRaiz(numPrimo); // g

  const a = gerarNumeroSecreto(numPrimo); // segredo de Alice
  const b = gerarNumeroSecreto(numPrimo); // segredo de Bob

  const chavePublicaAlice = calcularModExp(numRaiz, a, numPrimo);  // A = g^a mod p
  const chavePublicaBob = calcularModExp(numRaiz, b, numPrimo);    // B = g^b mod p

  const chaveSecretaAlice = calcularModExp(chavePublicaBob, a, numPrimo); // S = B^a mod p
  const chaveSecretaBob = calcularModExp(chavePublicaAlice, b, numPrimo); // S = A^b mod p

  // Cifra com AES-CTR usando a chave secreta
  const chaveAES = criarChaveAES(chaveSecretaAlice);
  const mensagemOriginal = 'Mensagem secreta da Alice e do Bob';

  const cifrado = cifrarAES(mensagemOriginal, chaveAES);
  const decifrado = decifrarAES(cifrado, chaveAES);

  console.log("p:", numPrimo);
  console.log("g:", numRaiz);
  console.log("a:", a);
  console.log("b:", b);
  console.log("Chave pública Alice:", chavePublicaAlice);
  console.log("Chave pública Bob:", chavePublicaBob);
  console.log("Chave secreta (Alice):", chaveSecretaAlice);
  console.log("Chave secreta (Bob):", chaveSecretaBob);

  console.log("\n--- AES-CTR ---");
  console.log("Mensagem original:", mensagemOriginal);
  console.log("Mensagem cifrada:", cifrado);
  console.log("Mensagem decifrada:", decifrado);
}

main();