import {Router, query} from 'express'
import { prodMg } from '../../dao/prodMg_db.js'

const router = Router()

const prodService = new prodMg()
router.get('/',async(req,res)=>{
    let {numPage,limit,query,sort} = req.query
    let prods = await prodService.getProducts(numPage,sort,limit,query)
    let jsonresponse = {status:"success",payload: prods} 
    res.send(jsonresponse)
})
router.get('/:pid',async(req,res)=>{
    const {pid} = req.params
    let prod = await prodService.getProductById(pid)
    res.send({status:"success",payload: prod})
})


router.post('/',async (req,res)=>{
    const {body} = req
    const result = await prodService.addProduct(body)
    if(result.status='error'){
        res.send(result)
    }else{
        res.send({status:'Success',payload:result})
    }
})
router.put('/:pid',async(req,res)=>{
    const {pid} = req.params
    const {body} = req
    const result = await prodService.updateProduct(pid,body)
    if(result.status='error'){
        res.send(result)
    }else{
        res.send({status:'Success',payload:result})
    }
})
router.delete('/:pid', async(req,res)=>{
    const {pid} = req.params
    await prodService.deleteProduct(pid)
    res.send('delete de productos')
})
/*router.get('/:uid',async(req,res)=>{
    res.send('get de productos')
})


*/

export default router