import * as pulumi from "@pulumi/pulumi";
import { run } from './program';

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
    console.log("Params: ", req.params);
    res.send("Deleted");
    
})

/*
POST http://localhost:3000/rg
Content-Type: application/json

{
    "projectName": "ndc",
    "rgName": "my-rg"
}

DELETE http://localhost:3000/rg/ndc
*/

app.listen(port, () => console.log("Application is running"));