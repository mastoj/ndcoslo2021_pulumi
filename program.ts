import { ResourceGroup } from '@pulumi/azure-native/resources';
import * as pulumi from '@pulumi/pulumi';
import { Config } from '@pulumi/pulumi';
import { InlineProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';

const createRg = (name: string) => {
    // Create kafka cluster
    // Create topic
    // ...
    return new ResourceGroup(name, {
        location: 'westeurope',
        tags: {
            'automated': 'true'
        }
    });
}

export const run = async (projectName: string, rgName: string) => {
    const program = async () => {
        const rg = createRg(rgName);
        return {
            rgName: rg.name
        };
    };

    const args: InlineProgramArgs = {
        stackName: projectName,
        projectName: 'automatedRg',
        program: program
    }
    const stack = await LocalWorkspace.createOrSelectStack(args);
    const upRes = await stack.up({onOutput: console.info});
    console.log('==> Rg name: ' + upRes.outputs.rgName.value);
    return upRes.outputs.rgName.value;
};

export const destroy = async (projectName: string) => {
    const args: InlineProgramArgs = {
        stackName: projectName,
        projectName: "automatedRg",
        program: async () => {}
    }
    const stack = await LocalWorkspace.createOrSelectStack(args);
    const destroyRes = await stack.destroy({onOutput: console.info});
    const ws = await LocalWorkspace.create({ projectSettings: { name: projectName, runtime: "nodejs"}});
    ws.removeStack("tomasja/automatedRg/" + projectName);
    return destroyRes.summary;
}