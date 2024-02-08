#!/user/bin/env node

import { mkdir, access } from 'fs/promises';
import { createFiles } from './filegen.js';

async function create(name, plural) { 
    try {
        const path = './force-app/main/default/classes/';
        // await mkdir('./force-app');
        // await mkdir('./force-app/main');
        // await mkdir('./force-app/main/default');
        // await mkdir('./force-app/main/default/classes');
        await createFiles(name, path, plural);
    } catch (error) {
        console.error(`Got an error trying to write the file: ${error.message}`);
    }
}

// console.log(process.argv); // -> [args] 0 and 1 are paths and can be ignored atm

const args = process.argv.slice(2);
console.log(args);
if (args.length === 0) {
    console.error('please enter a name for file generation')
} else if (args[0].startsWith('-')) {
    console.error('please enter name of file first');
} else {
    try {
        let plural;
        if (args.length === 3) {
            if (args[1] === '-p' || args[1] === '-P') {
                plural = args[2];
            } else {
                console.error('did not have -p');
                process.exit(1);
            }
        } else {
            console.log('did not have 3 args');
        }
        create(args[0], plural);
    } catch (error) {
        console.error(error);
        console.trace();
    }
}


// process.exit(1);