import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        console.log(colors.blue('Base de datos conectada'))
    } catch (error) {
        // console.log(error)
        console.log( colors.bgRed.white('Hubo un error al conectar a la base de datos') )
    }
}

connectDB()

const server = express() 


server.use('/', router)

export default server