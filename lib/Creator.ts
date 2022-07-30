const Inquirer = require("inquirer")
const downloadGitRepo = require("download-git-repo")
const { getRepo, getTagsByRepo } = require("./api")
const chalk = require("chalk")
const util = require("util")
const path = require("path")
const { loading } = require("./utils")
const log = console.log

export class Creator {
  name: string
  target: string
  downloadGitRepo: any
  constructor(name: string, target: string) {
    this.name = name
    this.target = target
    // 转化为 promise 方法
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  async create() {
    // 模板
    let repo = await this.getRepoInfo()
    // 标签
    let tag = await this.getTagInfo(repo)
    // 下载模板
    await this.download(repo, tag)
    // 提示
    log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    log(`\r\ncd ${chalk.cyan(this.name)}`)
    log(`npm install`)
    log(`npm run serve \r\n`)
  }
  // 获取模板信息和用户选择的模板
  async getRepoInfo() {
    // 获取所有仓库
    let repoList = await getRepo()
    if (!repoList) return
    // 提取是 template 的仓库
    const repos = repoList.filter((item: { name: string, is_template: boolean }) => item.name && item.is_template)
    let { repo } = await new Inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "Please choose a template",
        choices: repos
      }
    ])
    return repo
  }
  // 获取 tag 信息和用户选择的 tag
  async getTagInfo(repo: any) {
    let tagList = await getTagsByRepo(repo)
    if (!tagList) return
    const tags = tagList.map((item: { name: any }) => item.name)
    let { tag } = await new Inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "Please choose a version",
        choices: tags
      }
    ])
    return tag
  }
  // 下载模板
  async download(repo: any, tag: string) {
    const url = `daodaolee/${repo}${tag ? "#" + tag : ""}`
    console.log(url, path.resolve(process.cwd(), this.target))
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      url,
      path.resolve(process.cwd(), this.target)
    )
  }
}
// module.exports = Creator
// export {}