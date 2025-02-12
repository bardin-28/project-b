import express from 'express'
import sequelize from '@/database'
import monitoringRegister from '@/monitoring'
import cors from 'cors'
import api from './routes/api'
import { setupSwagger } from '@/documentation'
import './scheduler'
// import sgMail from '@sendgrid/mail'

console.info(process.env.SENDGRID_API_KEY, 'kee')

const app = express()
const port = process.env.PORT || 80

app.use(express.json())
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!')
})

app.get('/', (req, res) => {
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')

  // const msg = {
  //   to: 'vladyslav.tsyvinda@gmail.com', // Change to your recipient
  //   from: 'no-reply@tsyvinda.com', // Change to your verified sender
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error: any) => {
  //     console.error(error)
  //   })

  res.send('Hello')
})

// Monitoring
app.get('/metrics', async (_, res) => {
  try {
    res.set('Content-Type', monitoringRegister.contentType)
    res.end(await monitoringRegister.metrics())
  } catch (ex) {
    res.status(500).end(ex)
  }
})

app.use('/api', api)

setupSwagger(app)
