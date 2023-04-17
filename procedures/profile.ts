/////////////////////////////////////////////////////////
import { Profile,ProfileModel } from '../models/profile'
/////////////////////////////////////////////////////////
interface ResponseInterface {
    status:number,
    response: { message:string } | ProfileModel | ProfileModel[] 
}
/////////////////////////////////////////////////////////
interface ProfileCreate {
    name: string,
}
/////////////////////////////////////////////////////////
const Create = async ( data : ProfileCreate ) : Promise < ResponseInterface > => {

    try {
        
        /* Destructurin Data */
        let  { name } = data

        /* Verificar Si Existe Entidad */
        const Profileexist : ProfileModel | null = await Profile.findOne({ name })
        if (Profileexist) return { status: 400, response: { message: 'Entidad ya existente...' } }

        /*Si No Existe Entidad Crear */
        const newProfile : ProfileModel  = await Profile.create( {name} )
        return { status:200,response: {message:`ProfileId:${newProfile.ProfileId}`} }   
        
    } 
    catch (error) {
        console.error(error)
        return { status:500, response:{ message:"Problema Al Guardar"}}
    }

}
/////////////////////////////////////////////////////////
interface ProfileRead {
    ProfileId : string 
}
/////////////////////////////////////////////////////////
const Read = async ( data : ProfileRead ) => {
 
    try {   
         /*Buscar Entidad */
         let resultado : any
         const { ProfileId } = data
         resultado = await Profile.findOne( { ProfileId } )
         if(resultado === null ) return {status:400,response:{ message:"Entidad No Existente..."}}
         else return { status:200,response: resultado }   
    } 
    catch (error) {
        console.error(error)
        return {status:400,response:{ message:"Problema al Buscar"}}
    }
    
}
/////////////////////////////////////////////////////////
interface ProfileUpdate { 
    ProfileId : string, 
    name: string,
}
/////////////////////////////////////////////////////////
const Update =  async ( data : ProfileUpdate ) : Promise < ResponseInterface > => {

    try {
        const { ProfileId } = data

        /* Verificar Si Existe Entidad */
        const Profileexist : ProfileModel | null = await Profile.findOne({ ProfileId })
        if (!Profileexist) return { status: 400, response: { message: 'Entidad No existente...' } }
        
        const resultado = await Profile.updateOne({ ProfileId } , data )     
        const changes = resultado.modifiedCount
        return { status:200,response: { message:"Actualizado"} }   
    } 
    catch (error) {
        console.error(error)
        return {status:400,response:{message:"Problema Al Actualizar"}}
    }

}
/////////////////////////////////////////////////////////
interface ProfileDelete { 
    ProfileId : string 
}
/////////////////////////////////////////////////////////
const Delete =  async ( data : ProfileDelete ) => {

    try {
        const { ProfileId } = data
        const resultado = await Profile.deleteOne( { ProfileId } )     
        const changes = resultado.deletedCount
        return { status:200,response: { message:"Borrado",changes} }   
    } 
    catch (error) {
        console.error(error)
        return {status:400,response:{ message:"Problema AL Borrar"}}
    }
}
/////////////////////////////////////////////////////////
const FindAll = async ( ) => {
 
    try {   
         /*Buscar Todas Las Entidad */
         let resultado = await Profile.find()
         return { status:200,response: resultado }   
    } 
    catch (error) {
        console.error(error)
        return {status:400,response:{ message:"Problema al Buscar"}}
    }
    
}
/////////////////////////////////////////////////////////
interface ProfileFindName { name : string }
/////////////////////////////////////////////////////////
const FindName = async ( data : ProfileFindName ) : Promise < ResponseInterface > => {
 
    try {   
         /*Buscar Login */
         const { name } = data
         const profile : ProfileModel  | null = await Profile.findOne( { name } )
         if(profile === null ) return {status:400,response:{ message:"Entidad No Existente..."}}
         else return { status:200,response: profile }   
    } 
    catch (error) {
        console.error(error)
        return {status:500,response:{ message:"Problema al Buscar"}}
    }
    
}
/////////////////////////////////////////////////////////
export default { Create,Read,Update,Delete,FindAll,FindName }
/////////////////////////////////////////////////////////