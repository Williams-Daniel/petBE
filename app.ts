import express, { Application, Request, Response } from "express"
import cors from "cors"
import student from "./Router/studentRouter" 
import fee from "./Router/feeRouter" 
import bag from "./Router/bagRouter" 

export const appConfig = (app:Application)=>{
    app.use(express.json())
    app.use(cors())
    app.use("/api",student)
    app.use("/api",fee)
    app.use("/api",bag)


    app.get("/",(req:Request,res:Response)=>{
        try {
            res.status(200).json({
                message:"Everything is working fine"
            })
        } catch (error) {
            console.log(error)
        }
    })
}