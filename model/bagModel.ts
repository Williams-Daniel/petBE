import mongoose from "mongoose"


interface iBag {
    Bag:number
    Cash:number
    Student:{}
    
}

interface iBagData extends iBag, mongoose.Document{}

const bagModel = new mongoose.Schema<iBag>({
    Bag:{
        type:Number
    },
    Cash:{
        type:Number
    },
    Student:{
        type:mongoose.Types.ObjectId,
        ref:"bags"
    }
},
{timestamps:true})

const bagSchema = mongoose.model<iBagData>("student",bagModel)
export default bagSchema