#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
// const Command = require("./lib/command")
const Command_1 = require("./lib/Command");
// 版本
const v = require("../package.json").version;
program
    // 简要
    .name("cli-dao")
    .usage(`<command> [option]`)
    .version(`cli-dao ${v}`);
const command = new Command_1.Command();
// 创建
command.register("create");
// 监听 --help 指令
command.register("help");
program.parse();
