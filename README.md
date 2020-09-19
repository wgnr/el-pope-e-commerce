# El Pope E-Commerce
Final project of the course “React JS” given by CoderHouse [link](https://www.coderhouse.com/online/reactjs).

The goal is to built an E-Commerce using React leveraged by any UI library, in my case 
Material UI, as Front End and Firebase as a simple Back End.

The site should allow user to list products, access to their details, add them to basket, check out and retrieve purchase info by order id.

🕹 A live demo is available in Heroku [here](https://elpope.herokuapp.com/).

All products info belongs to [Chewy](https://www.chewy.com/).

## Do you want to try it by yourself?
Sure! Previously, you should have a new project created in your Firebase account and look for its [Firebase SDK’s web config info](https://firebase.google.com/docs/web/setup#config-object). I assume that you already have installed [Git](https://git-scm.com/) and [nodejs](https://nodejs.org/en/) in your computer.

First clone the repo and install its dependencies.
```bash
git clone https://github.com/wgnr/el-pope-e-commerce
cd el-pope-e-commerce
npm install
```
In the root directory, rename `.env.example`  to `.env`.
```bash
mv .env.example .env
```

Replace every REACT_APP_* variable with its correspondent value from the Firebase SDK config snippet.

Now we have two optins, use the data that is already mocked (A) or create your own (B).

A) If you are ok with the data that is already mocked in the file [mock/firebase.js](./mock/firebase.js), just run `npm run populate`.

B) If you would like to add your own data it's OK, I have create a simple structure. Go to [mock/firebase.js](./mock/firebase.js) and edit the variable `mockedData` as follow:
```javascript
/* There's a var that contains all mocked data */
const mockedData = [
  /* Create a new category */
  createCat(namePath1,nameToDisplay1,
    /* add these two product to the current category */
    createProduct(title1, photoURL1, price1, description1, stock1),
    createProduct(title2, photoURL2, price2, description2, stock2),
    ),
  /* For each category - product you have to call this method again */
  createCat(namePath2,nameToDisplay2,
    createProduct(title3, photoURL3, price3, description3, stock3),
    createProduct(title4, photoURL4, price4, description4, stock4),
    ),
]
```
Once you are done with it, save the file and run `npm run populate` to add your products to Firebase. A message in terminal will notice your that the process has been done.


Once A) or B) is completed... That's all! It's time to run the React App ✨✨.
```bash
npm run start
```
The App should be able in the url http://localhost:3000/

## Live demo
A link to heroku is provided -> [Live Demo](https://elpope.herokuapp.com/).

Consider that my Firebase project may not be available by the moment you are seeing this. A live demo video is available [in this link](https://youtu.be/yCoaqAGXvjg).

# Some comments
* Slightly responsive, not 100% optimized for mobile resolutions.
* Categories and products are loaded from Firebase.
* Routes were defined in a [centralized file](./src/app/routes/index.js).
* Stock is checked previous to check out.
* Cart persistence in localStorage and handled by context.
* Orders can be fetched buy enter the order ID.
* Loading linear bar handled by context.

# Used Libraries
* [Material UI](https://material-ui.com/): React components toolkit.
* [react-router-dom](https://github.com/ReactTraining/react-router): App routing.
* [react-hook-form](https://react-hook-form.com/): Form validation in checkout.
* [firebase](https://www.npmjs.com/package/firebase): Persist and query data.
* [DotEnv](https://www.npmjs.com/package/dotenv): Read `.env` keys to populate Firestore with nodejs.