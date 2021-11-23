"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = require("./program");
const args = process.argv.slice(2);
const projectName = args[0];
const rgName = args[1];
program_1.run(projectName, rgName).catch(err => console.log(err));
//# sourceMappingURL=index.js.map