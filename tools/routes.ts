//////////////////////////////////////////////////////////////////
import fs from 'fs'
import path from 'path'
//////////////////////////////////////////////////////////////////

export default () => {
    
    const routepath = path.join(__dirname, '../routes')
    const ref = "api"
    const routes = fs.readdirSync( routepath ).map( file => {      
    const name   = file.split(".")[0]
        

        let obj = {
            "name": name == 'index' ? `/${ref}` : `/${ref}/${name}`,
            "path":`./routes/${file}`
        }

        return obj
    })
     
    return routes
}

//////////////////////////////////////////////////////////////////