import {Router, query} from 'express'
import { UsersManagerMongo } from '../../dao/usrMg_db.js'


const router = Router()

const userService = new UsersManagerMongo()
router.get('/',async(req,res)=>{
    let {numPage,limit,query,sort} = req.query
    let prods = await userService.getProducts(numPage,sort,limit,query)
    let jsonresponse = {status:"success",payload: prods} 
    res.send(jsonresponse)
})
router.get('/:uid',async(req,res)=>{
    const {uid} = req.params
    let prod = await userService.getUserBy(uid)
    res.send({status:"success",payload: prod})
})


router.post('/',async (req,res)=>{
    const {body} = req
    const result = await userService.createUser(body)
    if(result.status='error'){
        res.send(result)
    }else{
        res.send({status:'Success',payload:result})
    }
})
router.put('/:pid',async(req,res)=>{
    const {pid} = req.params
    const {body} = req
    //const result = await userService.updateProduct(pid,body)
    if(result.status='error'){
        //res.send(result)
    }else{
        res.send({status:'Success',payload:result})
    }
})
router.delete('/:pid', async(req,res)=>{
    const {pid} = req.params
    //await userService.deleteProduct(pid)
    res.send('delete de productos')
})
/*router.get('/:uid',async(req,res)=>{
    res.send('get de productos')
})


*/

export default router