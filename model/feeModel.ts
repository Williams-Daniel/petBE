import mongoose from "mongoose"

interface iFee {
    Cash:number,
    studentID:string,
    schoolName:string
}

interface iFeeData extends iFee, mongoose.Document{}

const feeModel = new mongoose.Schema<iFee>({
    Cash:{
        type:Number
    },
    studentID:{
        type:String
    },
    schoolName:{
        type:String
    }
},
{timestamps:true})


const feeSchema =  mongoose.model<iFeeData>("studentsFee",feeModel)
export default feeSchema