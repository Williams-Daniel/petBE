import express, { Application } from "express"
import env from "dotenv"
import { dbConfig } from "./config/DB"
import { appConfig } from "./app"

env.config()


const port:string = process.env.PORT!
const app:Application = express()


process.on("uncaughtException",(error:Error)=>{
    console.log("")
    console.log("server is shutting down due to uncaughtException:", error)
    process.exit(1)
})

appConfig(app)
const server = app.listen(port,()=>{
    console.log("A server is running on port: ",port)
    dbConfig()
})


process.on("unhandledRejection",(reason:any)=>{
    console.log("")
    console.log("server is shutting down due to unhandledRejection:", reason)
    server.close(()=>{
        process.exit(1)
    })
})