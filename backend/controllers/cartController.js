import userModel from "../models/userModel.js"

const addToCart = async(req,res)=>{
    try {
        const {userId,iId,size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if (cartData[iId]) {
            if(cartData[iId][size]){
                cartData[iId][size] += 1
            }else{
                cartData[iId][size] = 1
            }
        }else{
            cartData[iId] = {}
            cartData[iId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added To cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const updateCart = async(req,res)=>{
    try {
        const {userId,iId,size,quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[iId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const getUserCart = async(req,res)=>{
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}