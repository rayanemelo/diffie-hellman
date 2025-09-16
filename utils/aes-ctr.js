import crypto from 'crypto';

// Converte número da chave em Buffer de 16 bytes
function criarChaveAES(numeroChave) {
  const buffer = Buffer.alloc(16);
  buffer.writeUIntBE(numeroChave, 16 - 6, 6); // ocupa 6 bytes
  return buffer;
}

// Cifra mensagem com AES-CTR
function cifrarAES(mensagem, chave) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-128-ctr', chave, iv);
  const conteudo = Buffer.concat([cipher.update(mensagem, 'utf8'), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    conteudo: conteudo.toString('hex'),
  };
}

// Decifra mensagem com AES-CTR
function decifrarAES({ iv, conteudo }, chave) {
  const ivBuffer = Buffer.from(iv, 'hex');
  const conteudoBuffer = Buffer.from(conteudo, 'hex');
  const decipher = crypto.createDecipheriv('aes-128-ctr', chave, ivBuffer);
  const mensagem = Buffer.concat([decipher.update(conteudoBuffer), decipher.final()]);
  return mensagem.toString('utf8');
}

export { criarChaveAES, cifrarAES, decifrarAES };