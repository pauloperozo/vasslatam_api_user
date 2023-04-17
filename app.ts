////////////////////////////////////////////////////////////////////////////////////////////
import dotenv  from 'dotenv'
dotenv.config() 
////////////////////////////////////////////////////////////////////////////////////////////

/* Cargamos Modulo/Tools Express */
import express from 'express'
import logger  from 'morgan'
import cors    from 'cors'

/*Cargamos Rutas */
import  HandleRoute from './tools/routes'

/*Cargamos Middleware */
import  Handle404 from './middleware/404'
import  Handle503 from './middleware/503'
import  DbCheck from './middleware/dbcheck'

/*Importamos Migraciones  */
import Migrations from './migrations'

////////////////////////////////////////////////////////////////////////////////////////////

/*Init Migrations */
Migrations()

/*Init Express */
const app = express()
      app.use( cors() )
      app.use( logger("dev") )
      app.use( express.json({limit: '50mb'}) )
      app.use( express.urlencoded( { limit: '50mb', extended: true } ) ) /* Tamaño De 50MB  */
      
      app.use( DbCheck )
      app.use( Handle503 ) /*Http Verifica El Timeout errores*/

      /*Routes */
      HandleRoute().forEach( route => {
        const module = require(route.path)
        app.use(route.name,module.default)
      })
      
      app.use( Handle404 ) /*Error 404*/
      

      export default app
      
////////////////////////////////////////////////////////////////////////////////////////////  