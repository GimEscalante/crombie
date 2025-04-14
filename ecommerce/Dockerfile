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

# 6. Genera el cliente de Prisma
RUN npx prisma generate

# 7. Construye la aplicación Next.js
RUN npm run build

# 8. Crea una imagen final más ligera para producción
FROM node:20-alpine

WORKDIR /app

# 9. Copia los archivos necesarios desde la imagen de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# 10. Establece las variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000

# 11. Expone el puerto de la aplicación
EXPOSE 3000

# 12. Comando de inicio
CMD  npm start
#npx prisma migrate deploy &&