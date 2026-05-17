import test from "node:test";
import assert from "node:assert/strict";
import { resolveDependencyGraph } from "./graph";


// create input and fake dependencies. 
// call the function 
// check the result. 

const fetchPackage = async (name: string, version: string) => {
    const leftPadMetadata = {
        name: 'left-pad',
        version: '1.0.0',
        dependencies: {},
        tarballUrl: 'https://registry.npmjs.org/left-pad/-/left-pad-1.0.0.tgz',
    };

    return leftPadMetadata;
};

test('Resolve one  direct dependency with no transitive dependencies.', async (testContext) => {
    const graph = await resolveDependencyGraph({
        'left-pad': '1.0.0'
    }, fetchPackage);

    assert.equal(graph.packages.size, 1);
});
