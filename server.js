const express = require("express");

const routes = require("./Routes/routes");
const dbConnect = require("./Config/dbConnect");
const cookieParser = require("cookie-parser");
const { cld } = require("./Config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");


const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

app.use(
	cors({
		origin:"https://quicklearn121.vercel.app",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(routes);
app.get("/", (req, res) => {
    res.status(200).json({
		message : 'welcome'
	});
});


cld();
dbConnect();

app.listen(4000,()=>{
    console.log('app has started');
})
