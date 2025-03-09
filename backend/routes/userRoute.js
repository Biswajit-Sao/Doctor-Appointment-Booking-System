import express from "express"
import { registerUser,loginuser, getProfile, updateProfile, bookAppoinment, listAppointment, cancelAppointment, paynentRazorpay, verifyRazorpay} from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const userRouter =express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginuser)


userRouter.get('/get-profile',authUser,getProfile)

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

userRouter.post('/book-appointment',authUser,bookAppoinment)

userRouter.get('/appointments',authUser,listAppointment)

userRouter.post('/cancel-appointment',authUser,cancelAppointment)

userRouter.post('/payment-razorpay',authUser,paynentRazorpay)

userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
export default userRouter