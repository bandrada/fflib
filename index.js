#!/user/bin/env node

import { writeFile, mkdir, access } from 'fs/promises';
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

create('Chair');

// process.exit(1);