const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const multer = require("multer")
const path = require("path")



const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const port = process.env.PORT || 8800

app.use(cors({
  origin: '/'
}));

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () =>{
   console.log("connected to MongoDB")
});

// if you use the /images path, don't make any request, instead go to the directory below
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(express.static(path.join(__dirname, "client", "build")))


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb)=> {
    cb(null, req.body.name);
  }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
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