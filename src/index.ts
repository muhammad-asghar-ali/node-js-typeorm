import dotenv from "dotenv"
import { DataSource } from 'typeorm'
import express from 'express'
import clientRoutes from "./routes/client"
import bankerRoutes from "./routes/banker"
import transactionRoutes from "./routes/transaction"

import { Client } from './entities/Client'
import { Banker } from "./entities/Banker"
import { Transaction } from "./entities/Transection"
dotenv.config()

// create and setup express app
const app = express()
app.use(express.json())

app.use('/api/clients', clientRoutes)
app.use('/api/bankers', bankerRoutes)
app.use('/api/transection', transactionRoutes)

const connection = new DataSource({
    type: "postgres" || process.env.TYPE,
    host: process.env.PGHOST,
    port: 5432 || process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [Client, Banker, Transaction],
    logging: true,
    synchronize: true,
});
connection
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

const serverPosrt = process.env.SERVERPORT

app.listen(serverPosrt, () => {
    console.log(`app is running on port ${serverPosrt}`)
})
