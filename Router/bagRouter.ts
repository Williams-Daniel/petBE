import express from "express"
import { createBag, getOneStudentBags } from "../controller/bagsController"


const router = express.Router()

router.route("/create-bag").post(createBag)
router.route("/:studentID/get-one-bag").get(getOneStudentBags)

export default router
