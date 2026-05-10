import { basename, join } from "node:path";
import { createDefaultManifest, writeManifest } from "../project/manifest";
import { access, constants } from "node:fs/promises";

export async function runInitWorkflow(options:{projectName?:string, projectDir?:string}){
    const projectDirectory = options.projectDir ?? process.cwd(); 
    if(await manifestExists(projectDirectory)){
    throw new Error("Saturn Manifest already exists");
    }
    const {projectName} = options;
    const name = projectName ?? basename(projectDirectory); 
 
    console.log(`Initializing project: ${name}`);
    const manifest = createDefaultManifest(name);
    
    await writeManifest(projectDirectory, manifest);    
    console.log(`Project initialized successfully`);
}

async function manifestExists(projectDirectory:string): Promise<boolean> {
    // check if saturn.json exists in the project directory
    const saturnJsonPath = join(projectDirectory, 'saturn.json');
    
    try{
        await access(saturnJsonPath, constants.F_OK);
        return true;
    }
    catch(error){
        return false;
    }
}