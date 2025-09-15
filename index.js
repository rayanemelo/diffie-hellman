import crypto from 'crypto';

// ---------- Utilitários do Diffie-Hellman ----------

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

// ---------- AES-CTR ----------

// Converte número da chave em Buffer de 16 bytes
function criarChaveAES(numeroChave) {
  const buffer = Buffer.alloc(16);
  buffer.writeUIntBE(numeroChave, 16 - 6, 6); // ocupa 6 bytes
  return buffer;
}

// Cifra mensagem com AES-CTR
function criptografarAES(mensagem, chave) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-128-ctr', chave, iv);
  const conteudo = Buffer.concat([cipher.update(mensagem, 'utf8'), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    conteudo: conteudo.toString('hex'),
  };
}

// Decifra mensagem com AES-CTR
function descriptografarAES({ iv, conteudo }, chave) {
  const ivBuffer = Buffer.from(iv, 'hex');
  const conteudoBuffer = Buffer.from(conteudo, 'hex');
  const decipher = crypto.createDecipheriv('aes-128-ctr', chave, ivBuffer);
  const mensagem = Buffer.concat([decipher.update(conteudoBuffer), decipher.final()]);
  return mensagem.toString('utf8');
}

// ---------- Execução principal ----------

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
const mensagemOriginal = 'Segredo entre Alice e Bob';

const cifrado = criptografarAES(mensagemOriginal, chaveAES);
const decifrado = descriptografarAES(cifrado, chaveAES);

// ---------- Resultados ----------

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
