import type Hook from '../entities/hook'

export class SingletonHookStore {
  private readonly hooks: Hook[] = []
  private static instance: SingletonHookStore | undefined
  private constructor () { }
  public static getInstance (): SingletonHookStore {
    if (SingletonHookStore.instance === undefined) {
      SingletonHookStore.instance = new SingletonHookStore()
    }
    return SingletonHookStore.instance
  }

  public addHook (hook: Hook): void {
    this.hooks.push(hook)
  }

  public removeHook (hook: Hook): void {
    const hookIndex = this.hooks.indexOf(hook)
    this.hooks.splice(hookIndex, 1)
  }

  public findHook (hookUUID: string): Hook | undefined {
    return this.hooks.find(hook => hook.uuid === hookUUID)
  }

  public getHooks (): Hook[] {
    return this.hooks
  }
}
