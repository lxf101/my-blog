import "reflect-metadata"
import {Connection, getConnection, createConnection} from 'typeorm'

import {User, UserAuth} from './entity'

let connectionReadyPromise: Promise<Connection> | null = null;
export const prepareConnection = () => {
    if(!connectionReadyPromise){
        connectionReadyPromise = (async ()=>{
            try{
                const staleConnection = getConnection();
                await staleConnection.close()
            }catch(error){

            }
            const connection = await createConnection({
                type: process.env.DATABASE_TYPE,
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [User, UserAuth],
                synchronize: false,
                logging: true
            })
            return connection
        })()
    }
    return connectionReadyPromise
}
