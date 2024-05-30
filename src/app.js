import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routers/viewsRouter.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { connectDB } from '../config/index.js'


const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(__dirname+'/public'))
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://coder:coder.2024@cluster0.yyfgeas.mongodb.net/ecommerce',
    mongoOptions:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },        
    ttl:60*60*1000*24
    }),
    secret: 's3cr3tC@d3r',
    resave: true,
    saveUninitialized: true,
    
}))

app.set('views',__dirname+'/views')
app.set('view engine','hbs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', viewsRouter)
connectDB()

app.listen(PORT, error => {
    if(error) console.log(`Error: ${error}`)
    console.log(`Server escuchando en el puerto ${PORT}`)

})
