import { Events as WhatsappEvents } from 'whatsapp-web.js'
import QRCode from 'qrcode'
import express from 'express'
import morgan from 'morgan'
import { SingletonHookStore } from './utils/stores'
import { CompactValidationErrors } from './utils/exeptions'
import { whatsappClient } from './config/whatsapp'
import whatsapp from './routes/whatsapp'
export const restApp = express()

restApp.use(morgan('tiny'))
restApp.use(express.static('public'))
restApp.use(express.json())
restApp.use(whatsapp)
restApp.use((error: CompactValidationErrors[] | unknown, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (error instanceof CompactValidationErrors) {
    res.status(400).send(error)
    return
  }
  res.status(500).send(error)
})

restApp.get('/', (req, res) => {
  res.send('Hello World!')
})

let expressIsRunning = false
function InitializeWebServer (): void {
  if (expressIsRunning) return
  restApp.listen(3000, () => {
    expressIsRunning = true
    console.info('Server is running on port 3000')
  })
}

function InitializeWhatsappAgent (): void {
  whatsappClient.initialize()
  whatsappClient.on('qr', (qr) => {
    QRCode.toFile('public/qr.png', qr)
    console.info('QR Ready')
  })

  whatsappClient.on('authenticated', () => {
    console.info('Whatsapp Authenticated')
  })

  whatsappClient.on('ready', () => {
    console.info('Whatsapp Ready')
  })

  whatsappClient.on('message', message => {
    if (message.body === '!ping') {
      message.reply('pong')
    }
  })

  InitializeWebServer()

  const eventsArray = Object.values(WhatsappEvents)

  eventsArray.forEach(eventName => {
    whatsappClient.on(eventName, (event) => {
      SingletonHookStore.getInstance().getHooks().forEach(hook => {
        if (hook.events.includes(eventName)) {
          fetch(hook.hookUrl, {
            method: 'POST',
            body: JSON.stringify({ eventName, event }),
            headers: { 'Content-Type': 'application/json' }
          })
        }
      })
    })
  })
}

InitializeWhatsappAgent()
