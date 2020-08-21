# for-lock-down

## How To Use 🔧

Download node_modules
```
npm install
```
Create .env file
```
touch .env
```
In your .env file add the following and replace specified values.  
Note: Things that need to be replaced are [site secret, user, password, cluster, dbname]  
```
PORT=3000
SECRET= #Your site secret here
MONGODB_URI='mongodb+srv://<user>:<password>@<cluster>/<dbname>.mongodb.net/test?retryWrites=true'
```
Note: To connect to a local database on your computer set MONGODB_URI to:
```
MONGODB_URI=mongodb://localhost/full-stack-cat
```

Launch the app in developement with live server reloads.
App will run on port 3000
```
npm run dev
```

---

## Technologies used 🛠️

- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - Makes Mongo DB easier to work with
- [EJS](https://ejs.co/) - Templates with JavaScript
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used to hash passwords
- [Passport](http://www.passportjs.org/) - Authenticating Users