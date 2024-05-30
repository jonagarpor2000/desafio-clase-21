import {Router} from 'express'
import { CartMgDb } from '../../dao/cartMg_db.js'
const router = Router()

const CartService = new CartMgDb()
router.get('/',async(req,res)=>{
    const carts = await CartService.getCarts()
    res.send({status:"success",payload:carts})
})
router.get('/:uid',async(req,res)=>{
    res.send('get de carts')
})
router.put('/:uid',async(req,res)=>{
    res.send('update de cart')
})
router.delete('/:uid', async(req,res)=>{
    res.send('delete de users')
})
router.post('/',async (req,res)=>{
    const {body} = req
    const result = await cartModel.create(body)
    res.send({status:'Success',payload:result})
})

export default router