"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator_1 = require("./Creator");
// const { Creator } = require("./Creator")
module.exports = async (projectName, options) => {
    // 获取当前工作目录
    const cwd = process.cwd();
    // 拼接得到项目目录
    const targetDir = path.join(cwd, projectName);
    // 判断目录是否存在
    if (fs.existsSync(targetDir)) {
        // 判断是否使用 -f 参数
        if (options.force) {
            // 删除重名目录(remove是个异步方法)
            await fs.remove(targetDir);
        }
        else {
            let { isOverwrite } = await new Inquirer.prompt([
                {
                    name: "isOverwrite",
                    type: "list",
                    message: "Target directory exists, Please choose a action",
                    choices: [
                        { name: "Overwrite", value: true },
                        { name: "Cancel", value: false }
                    ]
                }
            ]);
            if (!isOverwrite) {
                console.log("Cancel");
            }
            else {
                console.log("\r\n Removing");
                await fs.remove(targetDir);
            }
        }
    }
    const creator = new Creator_1.Creator(projectName, targetDir);
    creator.create();
};
