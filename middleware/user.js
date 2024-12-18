import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secret_key=process.env.SECRET_KEY

export const auth=(req,res,next)=>{
    const {credential}=req.cookies

    if(!credential) return res.status(403).json({
        success:false,
        message:"Login first"
    })

    try {
        const decoded = jwt.verify(credential,secret_key);
        req.id = decoded._id
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid token" ,token:jwt.verify(credential,secret_key)});
    }
}