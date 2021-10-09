import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';
import productRouter from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const app = express();

dotenv.config();

connectDB()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API running...')
})

app.use('/api/products', productRouter)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`.yellow.bold))