const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser')

dotenv.config();

app.use(cors({
  origin: '/'
}));

aws.config.update({
  secretAccessKey: process.env.SECRETACCESSKEY,
  accessKeyId: process.env.ACCESSKEYID,
  region: process.env.REGION
});

s3 = new aws.S3();

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const port = process.env.PORT || 8800


mongoose.connect(process.env.MONGO_URL, () =>{
   console.log("connected to MongoDB")
});

// if you use the /images path, don't make any request, instead go to the directory below
// app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(express.static(path.join(__dirname, "client", "build")))


//middleware
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("common"));

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'kizbook-imgs',
      key: function (req, file, cb) {
        console.log(file),
          cb(null, req.body.name); //use Date.now() for unique file keys
      },
  })
});;


app.post("/api/upload", upload.array("file"), (req, res)=>{
  try{
    return res.status(200).json("File uploaded successfully.")
  }catch(err){
    console.log(err)
  }
})



app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
}


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, ()=>{
  console.log("Backend server is running.")
})