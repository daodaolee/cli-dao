const ora = require("ora")
/**
 * 延迟函数
 * @param {Number} n 延迟时间
 */
function sleep(n: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}

/**
 * loading效果
 * @param {String} message 加载信息
 * @param {Function} fn 加载函数 
 * @param  {List} args 函数执行的参数
 * @returns 异步调用返回值
 */
// @ts-ignore
async function loading(message: string, fn: Function, ...args: any) {
  const spinner = ora(message)
  spinner.start()
  try {
    let executes = await fn(...args)
    spinner.succeed()
    return executes
  } catch (error) {
    spinner.fail("request fail reTrying")
    await sleep(1000)
    return loading(message, fn, ...args)
  }
}
module.exports = {
  loading
}