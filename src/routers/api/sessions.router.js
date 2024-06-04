// session -> login - register - logout
import {Router} from 'express'
import { UsersManagerMongo } from '../../dao/usrMg_db.js'
import { auth } from '../../middlewares/auth.middleware.js'
import { createHash, isValidPassword } from '../../utils/bcrypt.js'
import passport from 'passport'


export const sessionsRouter = Router()

const userService = new UsersManagerMongo

sessionsRouter.post('/register', async (req, res) => {
    const {first_name, last_name, email,password} = req.body
    try{
    if(!email ||!password) return res.status(401).send({status: 'error', error: 'se deben completar campos pendientes'})


    const userExist = await userService.getUserBy({email})
    if(userExist) return res.status(401).send({status: 'error', error: 'usuario ya existente'})
   const newUser = {
        first_name,
        last_name,
        email,
        password: await createHash(password),
    }

    const result = await userService.createUser(newUser)
    
    console.log(result)
    res.send('user registered')
    }catch(e){
        console.log(e)
        res.status(401).send({status: 'error', error: 'error al registrar usuario'})
    }
})


sessionsRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const userFound = await userService.getUserBy({email})
    if(!isValidPassword(password,{password: userFound.password})) return res.status(401).send({status: 'error', error: 'login failed'})
   
    req.session.user = {
        email,
        role: userFound.role
    }

    console.log(req.session.user)
    res.redirect('/products')
})


sessionsRouter.get('/github', passport.authenticate('github',{scope: 'user:email'}),async(req,res)=>{} )
sessionsRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
    req.session.user = req.user
    res.redirect('/products')
} )


sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(err) return res.send({status: 'error', error: err})
        else return res.redirect('/login')
    })
})


sessionsRouter.get('/profile', auth, (req, res) => {
    res.send('No esta autenticado')
})
