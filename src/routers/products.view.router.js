import {Router, query} from 'express'

const router = Router()

router.get('/',async(req,res)=>{
    let {numPage,limit,query,sort} = req.query
    console.log(`Tengo pag: ${numPage} y ${limit}`)
    try {
        let prods = await fetch(`http://localhost:8080/api/products?numPage=${numPage}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {return data.payload})
        console.log(prods)
        res.render('products',{
            products: prods
        })
        
    } catch (error) {
        console.log(error.message)
    }
    
})

export default router