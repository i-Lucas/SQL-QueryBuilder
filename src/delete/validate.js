export default function ValidateDeleteQuery(query) {

    let err = `on DeleteQuery: `;
    const properties = [{ operation: 'string' }, { table: 'string' }, { where: 'string' }];

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

    return true;
}