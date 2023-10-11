import {Request,Response} from "express"
import bcrypt from"bcrypt"
import studentSchema from "../model/StudentModel"
import { streamUpload } from "../utils/streamify"

export const registerStudent = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {email,password,studentName,schoolName} = req.body

        const salt =  await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password,salt)

        const newStudent = await studentSchema.create({
           studentName,
           schoolName,
            email,
            password:hashed,
            balance:0
        })
        return res.status(201).json({
            message:"Student registered successfully!!",
            data:newStudent
        })

    } catch (error) {
        return res.status(400).json({
            message:"Couldn't create student",
            data: error.message
        })
    }
}

export const signInStudent = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {email,password} = req.body

        const student = await studentSchema.findOne({email})
        if(student){
            const check = await bcrypt.compare(password,student.password)
            if(check){
                return res.status(200).json({
                    message:`Welcome back ${student.studentName}`,
                })
            }else{
                return res.status(404).json({
                    message:"Incorrect password"
                })
            }
        }else{
            return res.status(404).json({
                message:"Student not found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:"Couldn't create student",
            data: error.message
        })
    }
} 

export const allStudent = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const allStudent = await studentSchema.find({})
        return res.status(200).json({
            message:"All student gotten successfully!!",
            data:allStudent
        })

    } catch (error) {
        return res.status(400).json({
            message:"Couldn't get all student",
            data: error.message
        })
    }
} 

export const oneStudent = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {studentID} = req.params
        const oneStudent = await studentSchema.findById({studentID})
        return res.status(200).json({
            message:"Student gotten successfully!!",
            data:oneStudent
        })

    } catch (error) {
        return res.status(400).json({
            message:"Couldn't get student",
            data: error.message
        })
    }
} 

export const updateStudentInfo = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {studentID} = req.params
        const {phoneNumber,HouseAddress,gender}=req.body

        const student = await studentSchema.findByIdAndUpdate(
            studentID,
            {
                phoneNumber,
                HouseAddress,
                gender
            },
            {new:true}
        )
        return res.status(201).json({
            message:"student info has been updated",
            data:student
        })

    } catch (error) {
        return res.status(400).json({
            message:"Update couldn't be done!"
        })
    }
}
export const updateStudentImage = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {studentID} = req.params
        const {secure_url,public_id}:any= streamUpload(req)

        const student = await studentSchema.findByIdAndUpdate(
            studentID,
            {
                studentImage:secure_url,
                studentImageID:public_id
            },
            {new:true}
        )
        return res.status(201).json({
            message:"student image has been updated",
            data:student
        })

    } catch (error) {
        return res.status(400).json({
            message:"Update couldn't be done!"
        })
    }
}

