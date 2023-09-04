import mongoose from 'mongoose'
import { DATABASE_URL } from '$env/static/private'

const connection = {}

export async function connect() {
    if (connection.isConnected) {
        return
    }

    const db = await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState
}
