import * as pulumi from "@pulumi/pulumi";
import { run } from './program';

const args = process.argv.slice(2);
const projectName = args[0]
const rgName = args[1]
run(projectName, rgName).catch(err => console.log(err));