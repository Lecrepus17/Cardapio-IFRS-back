# Usa imagem Node oficial
FROM node:20


# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Compila TypeScript
RUN npm run 

# Expõe a porta (mude conforme seu app usa)
EXPOSE 3000

# Comando para rodar
CMD ["npm", "run", "start"]
