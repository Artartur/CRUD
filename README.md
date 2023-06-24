# CRUD

**The app is mobile so you have to download the Expo app from the PlayStore**

* Clone the Repo
* Run npm install
* Change the ips of API requests and add yours (Form, ViewData and axios)
*  Create a database on postegreSQL called crud
   * create a table called Users
   * add 3 columns:
     - id - Serial Auto_Increment, Not Null and Primary_Key
     - description - varchar(250) and Not Null
     - name - varchar(80) and Not Null
* Change database connection data (const db on server.js)
* Run npm start 
* Go to server/ directory 
* Run nodemon server.js in another terminal tab - To start the backend

**On Expo app, Press "Scan QR Code" and scan the QR code that is shown on terminal after running npm start**
