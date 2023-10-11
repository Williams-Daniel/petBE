import { Request, Response } from "express";
import bagSchema from "../model/bagModel";
import studentSchema from "../model/StudentModel";
import mongoose from "mongoose";



export const createBag = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {Bag,email} = req.body

        const student = await studentSchema.findOne({email})
        
        if(student){
        const newBag = await bagSchema.create({
            Bag,
            Cash:Bag * 200
        }) 

        await studentSchema.findByIdAndUpdate(
            student.id,
            {
                balance:student.balance + newBag.Cash
            },
            {new:true}
        )

        student.bagHistory.push(new mongoose.Types
            .ObjectId(newBag.id))
        student.save()

        return res.status(201).json({
            message:"Bags approved!",
            data:newBag
        })
        }else{
            return res.status(400).json({
                message:"couldn't create bag"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message:"Error found",
            data:error.message
        })
    }
}

export const getOneStudentBags = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {studentID} = req.params
const studentBags = await studentSchema.findById(studentID).populate({
    path:"bagHistory",
    options:{
        sort:{
            createdAt:-1
        }
    }
})

return res.status(200).json({
    message:"Gotten student's bags",
    data:studentBags
})
} catch (error) {
        return res.status(400).json({
            message:"Couldn't get student's bags"
        })
    }
}