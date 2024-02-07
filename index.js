#!/user/bin/env node

import { writeFile, mkdir, access } from 'fs/promises';

async function create(name) { 
    try {
        const path = '/bin/test/something/';
        if (!access('/bin')) {
            await mkdir('./bin');
            console.log('1');
        }
        if (!access('/bin/test')) {
            await mkdir('/bin/test');
            console.log('2');
        }
        if (!access('/bin/test/something')) {
            await mkdir('/bin/test/something');
            console.log('3');
        }
        const fileName = `${path}${name}.apex`;
        const data = 
`public class ${name} {
    public void ${name}() {

    }
}`;
        await writeFile(fileName, data);
        console.log(`Wrote data to ${fileName}`);
    } catch (error) {
        console.error(`Got an error trying to write the file: ${error.message}`);
    }
}

create('Chair');

// try { 
//     await writeFile('test.apex', 'data'); 
//     console.log(`Wrote data to test.apex`); 
// } catch (error) { 
//     console.error(`Got an error trying to write the file: ${error.message}`);
// }

// process.exit(1);