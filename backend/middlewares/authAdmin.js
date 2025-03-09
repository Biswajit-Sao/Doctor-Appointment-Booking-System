import jwt from "jsonwebtoken"

const authAdmin=async (req,res,next)=>{
    try {
        
        const {atoken}=req.headers
        if(!atoken){
            return res.json({success:false,message:"Note Authorized Login Again"})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EAMIL+process.env.ASMIN_PASSWORD){
            return res.json({success:false,message:"Note Authorized Login Again"})
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authAdmin