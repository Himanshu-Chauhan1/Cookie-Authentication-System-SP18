import {} from 'dotenv/config'
import express from 'express'
import privateRouter from './routes/private.js'
import userRouter from './routes/user.js'
import connectDB from './db/connectdb.js'
import cookieParser from 'cookie-parser'
const app = express()


app.use(cookieParser())
app.use(express.json())


const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL

//Database Connection
connectDB(DATABASE_URL)

//Load Routes
app.use("/",privateRouter, userRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})