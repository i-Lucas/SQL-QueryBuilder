export default function ValidateUpdateQuery(query) {

    let err = `on UpdateQuery: `;
    const properties = [{ operation: 'string' }, { table: 'string' }, { data: 'object' }];
    const data_props = [{ where: 'string' }, { fields: 'array' }, { types: 'array' }, { values: 'array' }];

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

    for (let i in data_props) {

        const property = Object.keys(data_props[i])[0];
        const type = data_props[i][property];
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

    query.data.values.map((value, index) => {
        if (query.data.types[index] !== typeof value) {
            err += `typeof '${value}' is not a '${query.data.types[index]}'\n`;
            throw new Error(err);
        }
    });

    return true;
}