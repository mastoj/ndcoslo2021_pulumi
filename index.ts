import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const message = config.get('message');
export { message };