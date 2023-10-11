import { Request, Response } from "express";
import studentSchema from "../model/StudentModel";
import feeSchema from "../model/feeModel";
import mongoose from "mongoose";


export const createFeeRecord = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {Cash,email} = req.body
        const student = await studentSchema.findOne({email})
        if(student){
            const fees = await feeSchema.create({
                Cash,
                studentID:student.id,
                schoolName:student.schoolName
            })

            await studentSchema.findByIdAndUpdate(
                student.id,
                {
                    balance:student.balance - fees.Cash
                },
                {new:true}
            )

            student.feeHistory.push(new mongoose.Types.ObjectId(fees.id))
            student.save()
            return res.status(201).json({
                message:"fee record created successfully",
                data:fees
            })
        }else{
            return res.status(201).json({
                message:"fee record could not be gotten"
            })
        }


    } catch (error) {
        return res.status(201).json({
            message:"Error found",
            data:error.message
        })
    }
}

export const getfeehHistory = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {studentID} = req.params

        const student = await studentSchema.findById(studentID).populate({
            path:"feeHistory",
            options:{
                sort:{
                    createdAt:-1
                }
            }
        })

        return res.status(200).json({
            message:"fee history gotten",
            data:student
        })
    } catch (error) {
        return res.status(404).json({
            message:"fee history could not be gotten",
            data:error.message
        })
    }
}