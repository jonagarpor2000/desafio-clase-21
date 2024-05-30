import {connect} from 'mongoose'

    
    const connectDB = () => {
        connect('mongodb+srv://coder:coder.2024@cluster0.yyfgeas.mongodb.net/ecommerce')
        console.log('Connected to DB')
    }

export {connectDB}