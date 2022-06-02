export default function ValidateInsertQuery(query) {

    if (typeof query !== 'object') { throw new Error('query is not an object\n\n') };
    
    const properties = [{ operation: 'string' }, { table: 'string' }, { data: 'object' }];
    const data_properties = [{ fields: 'array' }, { types: 'array' }, { values: 'array' }, { where: 'string' }];

    let err = `on InsertQuery: `;

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