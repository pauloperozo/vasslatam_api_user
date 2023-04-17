////////////////////////////////////////////////////////////////////////////////////////////
import mongoose, { Connection } from 'mongoose'
////////////////////////////////////////////////////////////////////////////////////////////
let connect: Connection | null = null
////////////////////////////////////////////////////////////////////////////////////////////
export default async (): Promise<Connection> => {

  if (connect) {
    console.log("Usando Conexion Existente Mongo Atlas...")
    return connect
  }

  try {

    const ms = process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 7000
    const uri: string = process.env.DATABASE_URL || ""
  
    const options = {
      connectTimeoutMS: ms,
      maxPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    const client = await mongoose.connect(uri, options)
    console.log('Conectado a MongoDB Atlas...')
    connect = client.connection
    return connect

  } 
  catch (error) {

    console.error(`Error De Conexion ${error}`)
    throw new Error(`Error De Conexion ${error}`)

  }

}
////////////////////////////////////////////////////////////////////////////////////////////

