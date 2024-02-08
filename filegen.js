import { writeFile } from 'fs/promises';

export function createFiles(name, path, plural = name + 's') {
    Promise.all([
        writeFile(path + plural + '.cls', domainContent(name, plural)),
        writeFile(path + plural + '.cls-meta.xml', xmlContent()),
        writeFile(path + name + 'Selector.cls', selectorContent(name)),
        writeFile(path + name + 'Selector.cls-meta.xml', xmlContent()),
    ]);
}

function domainContent(name, plural) {
    const data =
`public with sharing class ${plural} extends fflib_SObjectDomain {
    public ${plural}(List<${name}> sObjects) {
        super(sObjects);
    }
    
    public class Constructor implements fflib_SObjectDomain.IConstructable {
        public fflib_SObjectDomain construct(List<SObject> sObjects) { 
            return new ${plural}(sObjects);
        }        
    }
}`;
    return data;
}

function selectorContent(name) {
    const data =
`public inherited sharing class ${name} extends ApplicationSelector {
    public List<Schema.SObjectField> fields() {
        // place ${name}.field items below
        return new List<Schema.SObjectField> {

        };
    }

    public Schema.SObjectType getSObjectType() {
        return ${name}.sObjectType;
    }
}`;
    return data;
}

function xmlContent() {
    const apiVersion = '59.0';
    const data =
`<?xml version="1.0" encoding="UTF-8"?>
<ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>${apiVersion}</apiVersion>
    <status>Active</status>
</ApexClass>`;
    return data
}