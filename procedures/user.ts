/////////////////////////////////////////////////////////
import bcryptjs from 'bcryptjs'
import { User,UserModel } from '../models/user'
/////////////////////////////////////////////////////////
interface ResponseInterface {
    status:number,
    response: { message:string } | UserModel | UserModel[] 
}
/////////////////////////////////////////////////////////
interface UserCreate {
    name: string,
    email: string,
    phone: string,
    login: string,
    password: string,
    ProfileId: string,
    OwnerId:string | null
}
/////////////////////////////////////////////////////////
const Create = async ( data : UserCreate ) : Promise < ResponseInterface > => {

    try {

        /* Destructurin Data */
        let  { name,email,phone,login,password,ProfileId,OwnerId } = data

        /* Verificar Si Existe Entidad */
        const userexist : UserModel | null = await User.findOne({ login })
        if (userexist) return { status: 400, response: { message: 'Entidad ya existente...' } }
        
        /*Si No Existe Entidad Crear */
        const newuser : UserModel  = await User.create( {name,email,phone,login,password,ProfileId,OwnerId } )
        return { status:200,response: {message:`UserId:${newuser.UserId}`} }   
        
    } 
    catch (error) {
        console.error(error)
        return { status:500, response:{ message:"Problema Al Guardar"}}
    }

}
/////////////////////////////////////////////////////////
interface UserRead { 
    UserId : string 
}
/////////////////////////////////////////////////////////
const Read = async ( data : UserRead ) => {
 
    try {   
         /*Buscar Entidad */
         let resultado : any
         const { UserId } = data
         resultado = await User.findOne({ _id:UserId } )
         if(resultado === null ) return {status:400,response:{ message:"Entidad No Existente..."}}
         else return { status:200,response: resultado }   
    } 
    catch (error) {
        console.error(error)
        return {status:500,response:{ message:"Problema al Buscar"}}
    }
    
}
/////////////////////////////////////////////////////////
interface UserUpdate { 
    UserId : string, 
    name?: string,
    email?: string,
    phone?: string,    
    login?: string,
    password?: string 
}
/////////////////////////////////////////////////////////
const Update =  async ( data : UserUpdate ) : Promise < ResponseInterface > => {

    try {
        const { UserId } = data

        /* Verificar Si Existe Entidad */
        const userexist : UserModel | null = await User.findOne({ _id:UserId })
        if (!userexist) return { status: 400, response: { message: 'Entidad No existente...' } }

        const resultado = await User.updateOne({ _id:UserId } , data )     
        const changes = resultado.modifiedCount
    
        return { status:200,response: { message: `Registros Actualizados ${changes}`} }   
    } 
    catch (error) {
        console.error(error)
        return {status:500,response:{message:"Problema Al Actualizar"}}
    }

}
/////////////////////////////////////////////////////////
interface UserDelete { 
    UserId : string 
}
/////////////////////////////////////////////////////////
const Delete =  async ( data : UserDelete ) :  Promise < ResponseInterface > => {

    try {
        
        const { UserId } = data
        const result = await User.deleteOne( { _id:UserId } )     
        const { deletedCount } = result
        
        if( deletedCount > 0 ) return { status:200,response: { message:"Borrado Cone Exito."} }
        else return { status:400,response: { message:"No Existe Entidad Para Borrar."} }
   
    } 
    catch (error) {

        console.error(error)
        return {status:500,response:{ message:"Problema AL Borrar"}}

    }
}
/////////////////////////////////////////////////////////
const FindAll = async () : Promise < ResponseInterface > => {
 
    try {   

         /*Buscar Todas Las Entidades */
         const users = await User.find()
         return { status:200,response: users }   

    } 
    catch (error) {

        console.error(error)
        return {status:500,response:{ message:"Problema al Buscar"}}

    }
    
}
/////////////////////////////////////////////////////////
interface UserFindLogin { login : string }
/////////////////////////////////////////////////////////
const FindLogin = async ( data : UserFindLogin ) : Promise < ResponseInterface > => {
 
    try {   
         /*Buscar Login */
         const { login } = data
         const user = await User.findOne( { login } )
         if(user === null ) return {status:400,response:{ message:"Entidad No Existente..."}}
         else return { status:200,response: user }   
    } 
    catch (error) {
        console.error(error)
        return {status:500,response:{ message:"Problema al Buscar"}}
    }
    
}
/////////////////////////////////////////////////////////
const HashPassword = async ( password: string ) : Promise < string > => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}
/////////////////////////////////////////////////////////
const ComparePassword = async ( passwordIn: string,passwordStore: string ) : Promise < Boolean > => {
    return bcryptjs.compareSync(passwordIn,passwordStore)
}
/////////////////////////////////////////////////////////
export default { Create,Read,Update,Delete,FindAll,FindLogin,HashPassword,ComparePassword }
/////////////////////////////////////////////////////////