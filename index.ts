import * as pulumi from "@pulumi/pulumi";
import { destroy, run } from './program';

import * as express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

type CreateRequest = {
    projectName: string,
    rgName: string
}
app.post("/rg", async (req, res) => {
    const payload = req.body as CreateRequest;
    console.log("==> request: ", payload);
    const result = await run(payload.projectName, payload.rgName);
    res.send("Done: " + JSON.stringify(result));
});
app.delete("/rg/:projectName", async (req, res) => {
    const result = await destroy(req.params.projectName);
    res.send("Destroyed: " + JSON.stringify(result));
})
/*
DELETE http://localhost:3000/rg/hello
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

