import { gerarNumeroPrimo } from './numero-primo.js';
import { gerarRaiz, gerarNumeroSecreto } from './utils.js';
import { calcularModExp } from './mod-exp.js';

const numPrimo = gerarNumeroPrimo();
const numRaiz = gerarRaiz(numPrimo);

const a = gerarNumeroSecreto(numPrimo);
const b = gerarNumeroSecreto(numPrimo);

const chavePublicaAlice = calcularModExp(numRaiz, a, numPrimo);
const chavePublicaBob = calcularModExp(numRaiz, b, numPrimo);

const chaveSecretaAlice = calcularModExp(chavePublicaBob, a, numPrimo);
const chaveSecretaBob = calcularModExp(chavePublicaAlice, b, numPrimo);