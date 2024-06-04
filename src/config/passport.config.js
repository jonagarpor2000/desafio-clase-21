import passport from 'passport'
import githubStrategy from 'passport-github2'
import local from 'passport-local'
import { UsersManagerMongo } from '../dao/usrMg_db.js'



const LocalStrategy = local.Strategy
const userService = new UsersManagerMongo()

export const initializePassport = () =>{

    passport.use('github', new githubStrategy({
        clientID:'Iv23liHCtKp3Svuicb9g',
        clientSecret:'8979b0a8dcf46a9adb0434246562409ca3b242ba',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    },async (accessToken,refreshToken,profile,done)=>{
        try {
            console.log(profile)
            let user = await userService.getUserBy({email: profile._json.email})
            console.log(user)
            if(!user){
                console.log('no user')
                let newUser = {
                    first_name:profile._json.name.split(' ')[0],
                    last_name:profile._json.name.split(' ')[1],
                    email:profile._json.email,
                    password:'',
                    role:'user'
                }
                console.log('hay user')
                let result = await userService.createUser(newUser)
                done(null,result)
            }else{
                done(null,user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        try {
            const user = await userService.getUserBy({_id:id})
            done(null,user)
        } catch (error) {
            done(error)
        }
    })
    
}

export const auth = passport.authenticate('jwt',{session:false})
