# incode_group_node.js_test-assignment
## Setup
### Prepare the Node.js Server
1. Install project dependencies by running the following command:
    ```bash
    npm install
### MySQL Database Setup
1. Make sure you have MySQL Server installed on your computer.
2. Setup credentials at src/database/config/config.js
3. Create a database named incode_group_test_task.
    ```bash
    npx sequelize-cli db:create
4. Take SQL code from <em> db.sql </em>. Substitute your username and password. Run this script
   
   ```bash
   mysql -h localhost -u root -p < db.sql
5. Also you can run migration
   ```bash
    npx sequelize-cli db:migrate 
### .ENV Setup
1. Take example of <em>.env</em> file from <em>.env.example</em>
2. Set values for all <em>.env</em> variables 
- PORT - This variable specifies the network port where the server listens for incoming requests.
- CORS_ORIGIN - It specifies the origins that are allowed to access resources from the server.
- JWT_SECRET -  Secret key used for generating and verifying JSON Web Tokens.
- SHA256_SECRET - Secret key used for cryptographic hashing with the SHA-256 algorithm. 
- DB_NAME - Name of the database to connect to. 
- DB_USER - Username for authenticating with the database server.
- DB_PASSWORD - Password for authenticating with the database server.
- DB_HOST - Hostname or IP address of the database server.
### Running the Node.js Server
1. Start the server with the following command:
    ```bash
    npm run dev
2. Your Node.js server will be available at `http://localhost:8080/`
3. You can start the tests with the following command:
    ```bash
    npm run test
Your Node.js server should now be successfully set up and running, ready for use.

## Api Doc
### Api Doc available at [http://localhost:8080/api/docs](http://localhost:8080/api/docs)