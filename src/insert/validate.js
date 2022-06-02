export default function ValidateInsertQuery(query) {

    if (typeof query !== 'object') { throw new Error('query is not an object\n\n') }

    const properties = [
        { operation: 'string' },
        { table: 'string' },
        { data: 'object' }
    ];

    const data_properties = [
        { fields: 'array' },
        { types: 'array' },
        { values: 'array' },
        { where: 'string' }
    ];

    let err = `on INSERT: `;

    for (let i in properties) {

        const property = Object.keys(properties[i])[0];
        const type = properties[i][property];

        if (!query.hasOwnProperty(property)) {
            err += `query does not have the property ${property}.\n`;
            throw new Error(err);
        }

        if (typeof query[property] !== type) {

            err += `query.${property} is not a ${type}.\n`;
            throw new Error(err);

        }
    }

    for (let i in data_properties) {

        const property = Object.keys(data_properties[i])[0];
        const type = data_properties[i][property];
        const isArray = (prop) => Array.isArray(prop);

        if (!query.data.hasOwnProperty(property)) {
            err += `query.data does not have the property ${property}.\n`;
            throw new Error(err);
        }

        if (type === 'array' && !isArray(query.data[property])) {
            
            err += `query.data.${property} is not an Array.\n`;
            throw new Error(err);
        }

        if (typeof (query.data.where) !== 'string') {
            err += `query.data.where is not a string.\n`;
            throw new Error(err);
        }
    }

    return true
}


/*
export default function ValidateInsertQuery(query) {

    const properties = ['operation', 'table', 'data'];
    const data_properties = ['fields', 'types', 'values', 'where'];
    let err = 'on INSERT: ';

    for (let i in properties) {
        if (!query.hasOwnProperty(properties[i])) {
            err += `property ${properties[i]} is required\n`;
            throw new Error(err);
        }
    }

    for (let i in data_properties) {
        if (!query.data.hasOwnProperty(data_properties[i])) {
            err += `The data.${data_properties[i]} property is required\n`;
            throw new Error(err);
        }
    }

    if (query.data.fields.length !== query.data.types.length || query.data.fields.length !== query.data.values.length) {
        err += `The data.fields, data.types and data.values must have the same length\n`;
        throw new Error(err);
    }

    const isArray = (prop) => Array.isArray(prop);

    if (!isArray(query.data.fields) || !isArray(query.data.types) || !isArray(query.data.values)) {
        err += `The data.fields, data.types and data.values must be arrays\n`;
        throw new Error(err);
    }

    query.data.values.map((value, index) => {
        if (typeof value !== query.data.types[index]) {
            err += `Typeof value ${value} is not ${query.data.types[index]}\n`; throw new Error(err);
        }
    });

    if (query.data.where && typeof query.data.where !== 'string') {
        err += `The data.where property must be a string\n`;
        throw new Error(err);
    }

    return true
}*/