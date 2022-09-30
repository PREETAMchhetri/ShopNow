import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path'
import productRouter from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'
import PaytmChecksum from './Paytm_Node_Checksum-master/PaytmChecksum.js';
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


dotenv.config();
console.log(process.env);

connectDB()
app.use(express.json())



app.use('/api/products', productRouter)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API running...')
    })
}



const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`.yellow.bold))