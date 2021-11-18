import express from 'express'
import cors from 'cors'

const app = express()

app.use('/public',express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

export { app }