const express= require('express')
const ejs=require('ejs')
const mongoose=require('mongoose')
const path=require('path')
const flash=require('connect-flash')
const session =require('express-session')
//stape1 file upload
const multer=require('multer')
//connect mongoose
const dbDriver= "mongodb+srv://nodeblog:webskitters@123@cluster0.6gbuf.mongodb.net/eshop"
const app=express()
app.use(express.urlencoded({ extended:true}))


app.use(session({
    secret:'secrect',
    cookie:{maxAge:600000},
    resave:false,
    saveUninitialized:false
}))

app.use(flash())
app.use(express.static(path.join(__dirname,'public')))

//stape2 fileupload
app.use('/upload',express.static(path.join(__dirname,'upload')));

//stape3
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
//stape4 file type
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
} 
//stape5 file upload
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))



app.set('view engine','ejs')
app.set('viwes','views')

const ProductRoute =require('./route/product')
//const { json } = require('body-parser')
const ApiRoute=require('./route/Api_route')
app.use(ProductRoute)
app.use('/api',ApiRoute)



const port= process.env.PORT || 7001
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,()=>{
        console.log(`server running http://localhost:${port}`)
    })
}).catch(err=>{
    console.log(err)
})