import mongoose from "mongoose";

interface iStudent {
  email: string;
  password: string;
  studentName: string;
  phoneNumber: string;
  schoolName: string;
  HouseAddress: string;
  studentImage: string;
  studentImageID: string;
  gender: string;
  balance: number;
  feeHistory: {}[];
  bagHistory: Array<{}>;
}

interface iStudentData extends iStudent, mongoose.Document {}

const studentModel = new mongoose.Schema<iStudent>({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  studentName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  HouseAddress: {
    type: String,
  },
  studentImage: {
    type: String,
  },
  studentImageID: {
    type: String,
  },
  gender: {
    type: String,
  },
  balance: {
    type: Number,
  },
  feeHistory:[{
    type: mongoose.Types.ObjectId,
    ref:"fees"
  }],
  bagHistory:[{
    type: mongoose.Types.ObjectId,
    ref:"bags"
  }]
});


const studentSchema = mongoose.model<iStudentData>("students",studentModel)
export default studentSchema