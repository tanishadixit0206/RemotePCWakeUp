import bcrypt from 'bcrypt'

export default function hashPassword(password:string){
    return bcrypt.hash(password,10)
}