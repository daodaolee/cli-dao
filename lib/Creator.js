const Inquirer = require("inquirer")
const downloadGitRepo = require("download-git-repo")
const { getRepo, getTagsByRepo } = require("./api")
const chalk = require("chalk")
const util = require("util")
const path = require("path")
const { loading } = require("./utils")
const log = console.log

class Creator {
  constructor(name, target) {
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
    // 获取组织下的仓库信息
    let repoList = await getRepo()
    if (!repoList) return
    // 提取仓库名列表
    const repos = repoList.map(item => item.name)
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
  async getTagInfo(repo) {
    let tagList = await getTagsByRepo(repo)
    if (!tagList) return
    const tags = tagList.map(item => item.name)
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
  async download(repo, tag) {
    const url = `zhurong-cli/${repo}${tag ? "#" + tag : ""}`
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      url,
      path.resolve(process.cwd(), this.target)
    )
  }
}
module.exports = Creator