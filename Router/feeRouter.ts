import express from "express"
import { createBag, getOneStudentBags } from "../controller/bagsController"
import { createFeeRecord, getfeehHistory } from "../controller/feeController"


const router = express.Router()

router.route("/create-fee-record").post(createFeeRecord)
router.route("/:studentID/get-one-history").get(getfeehHistory)

export default router