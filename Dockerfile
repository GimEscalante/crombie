# 1. Usa una imagen base optimizada para Node.js
FROM node:20-alpine AS builder

# 2. Establece el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copia package.json y package-lock.json antes de instalar dependencias
COPY package.json package-lock.json ./

# 4. Instala las dependencias de producción
RUN npm ci

# 5. Copia el resto del código fuente
COPY . .

# 6. Copia el archivo de entorno para que esté disponible en build
COPY .env .env

# 7. Establece el entorno de producción para build
ENV NODE_ENV=production

# 8. Genera el cliente de Prisma
RUN npx prisma generate

# 9. Construye la aplicación Next.js
RUN npm run build

# 10. Nueva imagen para producción final
FROM node:20-alpine

# 11. Establece directorio de trabajo
WORKDIR /app

# 12. Copia los archivos necesarios desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# 13. Copia el archivo .env también en la imagen final (para runtime)
COPY .env .env

# 14. Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000

# 15. Expone el puerto de la aplicación
EXPOSE 3000

# 16. Comando de inicio
CMD ["npm", "start"]
