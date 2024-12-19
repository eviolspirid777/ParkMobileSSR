FROM node:20.11.1 as build
WORKDIR /app

# Copy only the package files and install dependencies
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ \
    && npm install

# Copy the remaining files and build the application
COPY . .
RUN npm run build

FROM node:20.11.1 as production
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]