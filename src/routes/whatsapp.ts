import express from 'express'
import { whatsappClient } from '../config/whatsapp'
import { Msg, Hook } from '../entities'
import { SingletonHookStore } from '../utils/stores'

const app = express()
export default app
/* -------------------------------------------------------------------------- */
/*                               HOOK ENDPOINTS                               */
/* -------------------------------------------------------------------------- */

app.post('/hooks/sub', function (req, res, next) {
  const newHook: Hook = new Hook(req.body)
  const hookStore = SingletonHookStore.getInstance()
  newHook.validateOrReject().catch((errors) => {
    next(errors)
  }).then(() => {
    if (hookStore.findHook(newHook.uuid) !== undefined) {
      res.status(400).send({
        message: 'Hook already exists'
      })
      return
    }
    hookStore.addHook(newHook)
    res.send(newHook)
  })
})

app.delete('/hooks/unsub/:hookUUID', function (req, res) {
  const hookUUID = req.params.hookUUID
  const hookStore = SingletonHookStore.getInstance()
  const hook = hookStore.findHook(hookUUID)
  if (hook === undefined) {
    res.status(404).send({
      message: 'Hook not found'
    })
    return
  }
  hookStore.removeHook(hook)
  res.send(hook)
})

app.get('/hooks', function (req, res) {
  console.log('GET /hooks')
  const hookStore = SingletonHookStore.getInstance()
  res.send(hookStore.getHooks())
})

app.get('/hooks/:hookUUID', function (req, res) {
  const hookUUID = req.params.hookUUID
  const hook = SingletonHookStore.getInstance().findHook(hookUUID)
  if (hook === undefined) {
    res.status(404).send({
      message: 'Hook not found'
    })
    return
  }
  res.send(hook)
})

/* -------------------------------------------------------------------------- */
/*                              WHATSAPP ACTIONS                              */
/* -------------------------------------------------------------------------- */

app.post('/msg/send', function (req, res, next) {
  const msg: Msg = new Msg(req.body)

  msg.validateOrReject().catch((errors) => {
    next(errors)
  }).then(() => {
    const ChatId: string = msg.phone.replace(/\D/g, '') + '@c.us'

    whatsappClient.sendMessage(ChatId, msg.msg)
      .then((message) => {
        res.send(
          message
        )
      })
      .catch((error) => {
        next(error)
      })
  })
})
