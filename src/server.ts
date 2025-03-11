import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
import pageRouter from './routes/page.routes'
dotenv.config()

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET_KEY)) // Use cookies
app.use(express.json()) // Allow JSON
app.use(express.urlencoded({ extended: true })) // Allow POST submission
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'))
app.use(pageRouter)

app.use((req, res) => {
    res.status(404).render('404');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`)
})