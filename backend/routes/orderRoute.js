import express from 'express'
import {verifyStripe,placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middlewaer/adminAuth.js'
import authUser from '../middlewaer/auth.js'


const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

orderRouter.post('/userorders',authUser,userOrders)

orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter

