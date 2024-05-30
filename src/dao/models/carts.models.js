import {Schema,model} from "mongoose";

const cartsCollection = 'carts'


const cartsSchema = new Schema({
    products: 
      { type:[{

        product:[{
          type: Schema.Types.ObjectId,
          ref: "products",
        }], 
        quantity: { type: Number,
           min: 1, 
           required: true }
        }]
      }
  });

cartsSchema.pre('findOne',function(){
  this.populate('products.product')
})

export const cartModel = model(cartsCollection,cartsSchema)