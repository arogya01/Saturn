import { runInitWorkflow } from "../workflows/init";


async function main(){
const args = process.argv.slice(2); 
const command = args[0]; 
const projectName = args[1];
const projectDir = args[2];
console.log(`Command: ${command}`);
console.log(`Args: ${args}`);


switch(command){
    case 'init':
        console.log('Initializing project...');
        await runInitWorkflow({
            projectName,
            projectDir
        })
        break;
    default:
        console.log('Unknown command');
        break;
}
}



main().catch((error) => {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
});
