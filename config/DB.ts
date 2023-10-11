import mongoose from "mongoose"
import env from "dotenv"
env.config()


const URL:string = process.env.DB_STRINGS!

export const dbConfig = ()=>{
    try {
        mongoose.connect(URL).then(()=>{
            console.log("")
            console.log("database connected successfully🚀🚀👏👏")
        })
    } catch (error) {
        console.log(error)
    }
}