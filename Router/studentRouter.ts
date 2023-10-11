import express from "express"
import { allStudent, oneStudent, registerStudent, signInStudent, updateStudentImage, updateStudentInfo } from "../controller/studentController"
import multer from "multer"

const upload = multer().single("avatar")

const router = express.Router()

router.route("/register").post(registerStudent)
router.route("/sign-in").post(signInStudent)
router.route("/all-student").get(allStudent)
router.route("/:studentID/one-student").get(oneStudent)
router.route("/:studentID/update-student-info").patch(updateStudentInfo)
router.route("/:studentID/update-student-image").patch(upload,updateStudentImage)

export default router
