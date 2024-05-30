import {Router} from 'express'
import { CartMgDb } from '../../dao/cartMg_db.js'
const router = Router()

const CartService = new CartMgDb()
router.get('/',async(req,res)=>{
    const carts = await CartService.getCarts()
    res.send({status:"success",payload:carts})
})
router.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.getCartById(cid)
    if(result instanceof Error){
        res.status(404).send({status:'Error',payload:result.message})
    }else{
        res.send({status:'Success',payload:result})
    }
})  
router.post('/',async (req,res)=>{
    const {body} = req
    const {cid,pid,quantity} = body
    let result = await CartService.addProductToCart(cid,pid,quantity)
    res.send({status:'Success',payload:result})
})
router.put('/:cid',async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.updateCart(cid)
    if(result instanceof Error){
        res.status(404).send({status:'Error',payload:result.message})
    }else{
        res.send({status:'Success',payload:result})
    }
})
router.delete('/:cid/products/:pid', async(req,res)=>{
    const {cid,pid} = req.params
    let result = await CartService.deleteProductOnCart(cid,pid)
    if(result instanceof Error){
        res.status(404).send({status:'Error',payload:result.message})
    }else{
        res.send({status:'Success',payload:result})
    }
    
    
})

router.delete('/:cid', async(req,res)=>{
    const {cid} = req.params
    let result = await CartService.emptyCart(cid)
    if(result instanceof Error){
        res.status(404).send({status:'Error',payload:result.message})
    }else{
        res.send({status:'Success',payload:result})
    }
})


export default router