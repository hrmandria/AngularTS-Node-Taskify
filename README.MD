# Simple NodeJs Express API

A Simple project template using NodeJs Express Server with a MongoDB Database and Mongoose.

# Installation

```Bash
npm install
# Or
yarn install
```

# Run your project

```Bash
# run on dev
npm run dev
# Or
yarn dev

# run on dev with eslint
npm run dev:eslint
# Or
yarn dev:eslint

# run on prod
npm start
# Or
yarn start

# run on prod local
npm run start:local
# Or
yarn start:local

# eslint
npm run lint
# Or
yarn linr
```

# .env

Configure your environment variables with .env file.

Example :

Dotenv file (.env) :
```Text
CS = mongodb://localhost:27017/api-express-template
```
Javascript file (*.js) :
```Javascript
console.log(process.env.CS)
// Output : mongodb://localhost:27017/api-express-template
```

# Mongoose

Create your own Mongoose structure or follow the existing structure. <br/>
[Read the docs](https://mongoosejs.com/docs/api.html)

# Multer

You can upload a single file with multer using the UploadFile middleware <br/>

Example :<br/>
```Javascript
const { app } = require('../modules/app.module.js')
const { UploadFile } = require('../modules/upload.module.js')

app.post('/upload-file', UploadFile('folder','image') , (req,res) => {
    console.log(req.body)
    // Output : { image : 45879664523.png }
})
```

You can upload multiple files using the UploadFiles middleware <br/>

Example :<br/>
```Javascript
const { app } = require('../modules/app.module.js')
const { UploadFiles } = require('../modules/upload.module.js')

app.post('/upload-files', UploadFiles('folder','image',15) , (req,res) => {
    console.log(req.body)
    // Output : [{ image : 0_45879664523.png },{ image : 1_45879664523.png }]
})
```

Or you can upload fields using the UploadFiles middleware <br/>

Example :<br/>
```Javascript
const { app } = require('../modules/app.module.js')
const { UploadFields } = require('../modules/upload.module.js')

const fields = [
    {
        name:'image',
        maxCount:2
    },
    {
        name:'picture',
        maxCount:4
    }
]

app.post('/upload-fields', UploadFields('folder',fields) , (req,res) => {
    console.log(req.body)
    /*
        image : [
            "0_0_785623.png",
            "0_1_785623.png"
        ],
        cover : {
            "1_0_785623.png",
            "1_1_785623.png"
        }
    */
})
```

See more about [Multer](https://github.com/expressjs/multer)

# Authentication Module

You can also use the authentication module with Jsonwebtoken by importing the Auth Middleware.<br/>
If you don't specify your token key, the module will search it on the Authorization field on your request headers. <br/>
Your decoded token will be in a x-payload field on your request.<br/>
Example :

```Javascript
const { app } = require('../modules/app.module.js')
const { Auth } = require('../modules/auth.module.js')

// The module will search your token on req.headers['x-token']
// By default it will search on req.headers['authorization']
app.get('/articles',Auth('x-token'),(req,res) => {
    console.log(req['x-payload'])
    // Output : Your token payload.
    res.json([{_id:'78523e856',name:'example',price:12}])
})

```