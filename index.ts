import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const message = config.get('message');
export { message };

import { ResourceGroup } from "@pulumi/azure-native/resources";
const resourceGroup = new ResourceGroup('ndc-rg', {});