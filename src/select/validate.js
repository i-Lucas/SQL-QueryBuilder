export default function ValidateSelectQuery(query) {

    if (typeof query !== 'object') { throw new Error('query is not an object\n\n') }

    const properties = [{ operation: 'string' }, { from: 'string' }, { all: 'boolean' }, { data: 'object' }];
    const data_props = [{ where: 'string' }, { fields: 'array' }, { as: 'array' }, { join: 'array' }, { on: 'array' }];
    const params_props = [{ limit: 'number' }, { offset: 'number' }, { order: 'string' }];

    let err = `on SelectQuery: `;

    if (query.all) {

        const required_props = [{ operation: 'string' }, { from: 'string' }, { all: 'boolean' }, { where: 'string' }];

        for (let i in required_props) {

            const property = Object.keys(required_props[i])[0];
            const type = required_props[i][property];

            if (!query.hasOwnProperty(property)) {
                err += `query does not have the property ${property}.\n`;
                throw new Error(err);
            }
            if (typeof query[property] !== type) {
                err += `query.${property} is not a ${type}.\n`;
                throw new Error(err);
            }
        }
    }

    if (!query.all) {
        if (query.where) { console.log('\nquery.where is not being used, remove it !\n') }
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
    }
    if (query.params) {
        for (let i in params_props) {
            const property = Object.keys(params_props[i])[0];
            const type = params_props[i][property];

            if (!query.params.hasOwnProperty(property)) {
                err += `query.params does not have the property ${property}.\n`;
                throw new Error(err);
            }
            if (typeof query.params[property] !== type) {
                err += `query.params.${property} is not a ${type}.\n`;
                throw new Error(err);
            }
        }
    }

    return true
}