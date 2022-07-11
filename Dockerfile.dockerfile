FROM cypress/base:16.13.0

WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./

ENTRYPOINT [ "npm", "run"]
CMD ["test"] 