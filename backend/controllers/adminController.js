import {v2 as cloudinary} from "cloudinary"
import validator from "validator"
import bcrypt from "bcrypt"
import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModel.js"
import appointmentModel from "../models/appointmentModel.js"
import jwt from "jsonwebtoken"
// API FOR ADDING DOCTOR

const addDoctor=async (req,res)=>{

    try {
        const{name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees ||!address){
            return res.json({success:false,message:"Missing Datails"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Plese enter a valide email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Plese enter a strong password"})
        }

        //HASING PASSWORD

        const salt=await bcrypt.genSalt(10)
        const hasedPassword=await bcrypt.hash(password,salt)

        //UPLOAD IMAGE TO CLOUDINARY
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hasedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date:Date.now()

        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }


}

// API FOR ADMIN LOGIN
const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EAMIL && password===process.env.ASMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
             res.json({success:true,token})
            

        }else{
        res.json({success:false,message:"Invalid credentials"})

        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API to get all doctors list

const allDoctors =async (req,res)=>{
    try {
        
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API TO GET APPOINTMENT 
const appointmentsAdmin=async(req,res)=>{
    try {
        
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const appointmentCancle=async(req,res)=>{
    try {
        const {appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
   

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const {docId,slotDate,slotTime}=appointmentData

        const doctorData=await doctorModel.findById(docId)

        let slots_booked =doctorData.slots_booked

        slots_booked [slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const adminDashboard=async (req,res)=>{
    try {
        
        const doctors= await doctorModel.find({})
        const user =await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:user.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancle,adminDashboard}