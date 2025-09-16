# Diffie-Hellman + AES-CTR com Node.js

Este projeto implementa o protocolo de troca de chaves Diffie-Hellman em JavaScript, com suporte à criptografia simétrica usando AES-CTR e testes de desempenho com chaves de 512, 1024 e 2048 bits.

---

## Tecnologias usadas

- Node.js + módulo nativo `crypto`
- `bigint-crypto-utils` para manipulação de inteiros grandes e primos
- Docker + Docker Compose

---

## Como rodar o projeto com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/rayanemelo/diffie-hellman
cd diffie-hellman
```

### 2. Construa a imagem Docker
```
docker-compose build
```

### 3. Execute o container
```
docker-compose up
```