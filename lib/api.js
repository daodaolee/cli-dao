const axios = require("axios")

axios.interceptors.response.use(res => {
  return res.data
})

async function getRepo() {
  return axios.get("https://api.github.com/orgs/zhurong-cli/repos")
}

async function getTagsByRepo(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepo,
  getTagsByRepo
}