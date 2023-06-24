# CRUD

The Application is mobile, so you must download Expo app on PlayStore.

* Clone the Repo
* npm install
* Change the ips of API requests and add yours
*  Create a database on postegreSQL called crud
   * create a table called Users
   * add 3 columns:
     - id - Serial Auto_Increment, Not Null and Primary_Key
     - description - varchar(250) and Not Null
     - name - varchar(80) and Not Null
* Change database connection data (const db on server.js)
* npm start 
* Go to server/ directory 
* nodemon server.js - To start the backend

**On Expo app, Press "Scan QR Code" and scan the QR code that is shown on terminal after running npm start**
