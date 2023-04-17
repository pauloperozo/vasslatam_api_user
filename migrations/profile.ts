////////////////////////////////////////////////////////////////////////////////////////////
import { Profile } from '../models/profile'
////////////////////////////////////////////////////////////////////////////////////////////
export default async (): Promise< void > => {

    /* Verificar si la colección "Profile" tiene datos */
    const count : number = await Profile.countDocuments({});

    if ( count === 0 ) {

        console.log('Crear Perfiles.')
    
        interface ProfileCreate {
            name: string
        }

        const profiles: ProfileCreate[] = [
            { name: 'Administrador'},
            { name: 'Subcuenta'}
        ]

        try { 
            await Profile.insertMany(profiles) 
        } 
        catch (error) { 

            console.error('Ocurrió un error al insertar los perfiles:', error) 
        } 
    }
    
}
////////////////////////////////////////////////////////////////////////////////////////////
