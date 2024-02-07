#!/user/bin/env node

import { writeFile, mkdir, access } from 'fs/promises';
import { Command } from 'commander';
import { getApex } from './apex.js';

async function create(name) { 
    try {
        const path = './bin/test/something/';
        try {
            await access('./bin');
        } catch (error) {
            await mkdir('./bin');
        }

        try {
            await access('./bin/test');
        } catch (error) {
            await mkdir('./bin/test');
        }

        try {
            await access('./bin/test/something');
        } catch (error) {
            await mkdir('./bin/test/something');
        }

        const fileName = `${path}${name}.apex`;
        const data = getApex(name);
        await writeFile(fileName, data);
        console.log(`Wrote data to ${fileName}`);
    } catch (error) {
        console.error(`Got an error trying to write the file: ${error.message}`);
    }
}

const program = new Command();
program
    .name('fflib')
    .description('a cli to create standard apex files for a project using the salesforce fflib framework')
    .version('1.0.0');

program.command('create')
    .description('Create the apex files needed to get started with Selector and Domain classes')
    .argument('<string>', 'string that is the name of the SObject you want to create files for')
    .option('-m', 'use org meta data to fill standard values (NOT YET IMPLEMENTED)')
    .action((str, options) => {
        // console.log(options); -> {m: true}
        create(str);
});

program.parse();
// create('Chair');

// process.exit(1);