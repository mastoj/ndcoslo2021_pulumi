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
const program_1 = require("./program");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.post("/rg", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log("==> request: ", payload);
    const result = yield program_1.run(payload.projectName, payload.rgName);
    res.send("Done: " + JSON.stringify(result));
}));
app.delete("/rg/:projectName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield program_1.destroy(req.params.projectName);
    res.send("Destroyed: " + JSON.stringify(result));
}));
/*
DELETE http://localhost:3000/rg/ndc
*/
/*
POST http://localhost:3000/rg
Content-Type: application/json

{
    "projectName": "ndc",
    "rgName": "my-rg"
}
*/
app.listen(port, () => console.log("Application is running"));
//# sourceMappingURL=index.js.map