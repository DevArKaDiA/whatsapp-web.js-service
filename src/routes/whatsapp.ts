import { restApp } from '..'
import Hook from '../entities/hook'
import { SingletonHookStore } from '../utils/stores'

restApp.post('/hooks/sub', function (req, res, next) {
  const newHook: Hook = new Hook(req.body)
  const hookStore = SingletonHookStore.getInstance()
  newHook.validateOrReject().catch((errors) => {
    next(errors)
  })

  if (hookStore.findHook(newHook.uuid) !== undefined) {
    res.status(400).send({
      message: 'Hook already exists'
    })
    return
  }
  hookStore.addHook(newHook)
  res.send(newHook)
})

restApp.get('/hooks', function (req, res) {
  const hookStore = SingletonHookStore.getInstance()
  res.send(hookStore.getHooks())
})

restApp.get('/hooks/:hookUUID', function (req, res) {
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
