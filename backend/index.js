import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/signupUser.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('mongoDB is connected'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'internal server error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
