const app= require("./app")
const dotenv=require("dotenv")
const connectDatabase= require("./config/database")
const cors= require('cors')
//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)

})

app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
//config
dotenv.config({path:"backend/config/config.env"})

// Connecting to database


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port http://localhost:${process.env.PORT}`)
})
connectDatabase()


//Unhandeled Promise Rejections
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to Unhandeled Promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})