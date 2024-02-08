import { writeFile } from 'fs/promises';

export function createFiles(name, path, ending = 's') {
    Promise.all([
        writeFile(path + name + ending + '.cls', domainContent(name, ending)),
        writeFile(path + name + ending + '.cls-meta.xml', xmlContent()),
        writeFile(path + name + 'Selector.cls', selectorContent(name)),
        writeFile(path + name + 'Selector.cls-meta.xml', xmlContent())
    ]);
}

function domainContent(name, ending) {
    const data =
`public with sharing class ${name}${ending} extends fflib_SObjectDomain {
    public ${name}${ending}(List<${name}> sObjects) {
        super(sObjects);
    }
    
    public class Constructor implements fflib_SObjectDomain.IConstructable {
        public fflib_SObjectDomain construct(List<SObject> sObjects) { 
            return new ${name}${ending}(sObjects);
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