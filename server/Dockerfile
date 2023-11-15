# Imagem base
FROM node:14-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm i

# Copiar o código-fonte do projeto
COPY . .

# Compilar o projeto
RUN npm run build

# Porta do servidor NestJS
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "dist/main"]
