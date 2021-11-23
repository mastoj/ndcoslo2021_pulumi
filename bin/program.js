"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("@pulumi/azure-native/resources");
const automation_1 = require("@pulumi/pulumi/automation");
const createRg = (name) => {
    return new resources_1.ResourceGroup(name, {
        location: 'westeurope',
        tags: {
            'automated': 'true'
        }
    });
};
exports.run = (projectName, rgName) => __awaiter(void 0, void 0, void 0, function* () {
    const program = () => __awaiter(void 0, void 0, void 0, function* () {
        const rg = createRg(rgName);
        return {
            rgName: rg.name
        };
    });
    const args = {
        stackName: projectName,
        projectName: 'automatedRg',
        program: program
    };
    const stack = yield automation_1.LocalWorkspace.createOrSelectStack(args);
    const upRes = yield stack.up({ onOutput: console.info });
    console.log('==> Rg name: ' + upRes.outputs.rgName.value);
    return upRes.outputs.rgName.value;
});
//# sourceMappingURL=program.js.map