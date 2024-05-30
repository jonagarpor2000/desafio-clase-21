import { cartModel } from "./models/carts.models.js";
class CartMgDb {
    constructor() {
        this.model = cartModel
    }
    getCarts = async () => {
        return await this.model.find({})
    }

    updateCart = async (cid,pid) => {
        let incremental = await this.model.findOneAndUpdate(
            {_id:cid, 'products.product': pid},
        {$inc:{'products.$.quantity':1}},
        {new:true}
    )
        return incremental
    }
    changeCartQuantity = async (cid,pid) => {
        try {
            const updatedCart = await this.model.findOneAndUpdate(
              { _id: cid },
              { $set: { product: {pid}, quantity } },
              { new: true }
            );
            if (!updatedCart) {
              return Error('Cart not found') ;
            }
            return updatedCart; 
          } catch (err) {
            console.error(err);
            return Error('Error updating product') ;
          }
    }

    getCartById = async (cid) => {
        try {
            return await this.model.findOne({_id:cid})
            //.populate([{path: `product`,strictPopulate: false}])
        } catch (error) {
            return Error(error)
        }
    
    }
    createCart = async () => await this.model.create({products: []})

    addProductToCart = async (cid, pid,quantity) => {
            let cart = await this.getCartById(cid)
        if(!cart?.products||!cid){
            
            cid = (await this.createCart())._id
        }
            let result = await this.model.findByIdAndUpdate({_id:cid},
                {$push:
                    {products:{product: pid,quantity}}
                },{ new: true })
            console.log(result)  
            return result
        
    }

    deleteProductOnCart = async (cid, pid) => {
        let cart = await this.getCartById(cid)
        if(!cart){     
            return Error(`The cart doesn't exists`)
        }else{
            console.log(`Carrito: ${cid} y producto: ${pid}`)
            let result = await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid  } } },
                { new: true }
              );
            return result
        }

    }
    emptyCart = async (cid) => {
        try {
            const updatedCart = await this.model.findOneAndUpdate(
              { _id: cid },
              { $set: { products:[]} },
              { new: true }
            );
            if (!updatedCart) {
              return Error('Cart not found') ;
            }
            return updatedCart; 
          } catch (err) {
            console.error(err);
            return Error('Error deleting product') ;
          }
    }
}

export {CartMgDb}