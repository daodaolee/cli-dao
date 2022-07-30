const program = require("commander")
const chalk = require("chalk")
const figlet = require("figlet")
const log = console.log

type TypeCommandName = "create" | "help"

export class Command {
  constructor() { }
  // 创建
  create() {
    program
      .command(`create <project-name>`)
      // 描述信息
      .description(`create a new project`)
      // 强制覆盖
      .option(`-f --force`, "overwrite target directory if it exists")
      .action((projectName: string, cmd: any) => {
        // 引入 create模块
        require("./create")(projectName, cmd)
      })
  }
  // help提示
  help() {
    program.on("--help", () => {
      const logo = figlet.textSync('cli-dao', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })

      log(`\n Run ${chalk.cyan("cli-dao <command> --help")} for detailed usage of given command. \n`)
      log(logo)
    })
  }
  // 注册指令
  register(name: TypeCommandName) {
    if (name in this) {
      this[name]()
    }
  }
}

// module.exports = Command
// export { }