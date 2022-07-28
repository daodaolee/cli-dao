const axios = require("axios")

axios.interceptors.response.use((res: { data: any }) => {
  return res.data
})

/**
 * 
 * @returns 返回仓库列表
 */
async function getRepo() {
  return axios.get("https://api.github.com/orgs/zhurong-cli/repos")
  // return axios.get("https://api.github.com/repos/daodaolee/react-ts-template")
}

/**
 * 
 * @param repo 仓库名称
 * @returns 返回 tag 数据
 */
async function getTagsByRepo(repo: string) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepo,
  getTagsByRepo
}