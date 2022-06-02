import ValidateDeleteQuery from "./validate.js";

export default function UpdateQuery(query) {

    if (ValidateDeleteQuery(query)) {

        let where = query.data.where !=='' ? ` WHERE ${query.data.where}` : '';
        let result = `UPDATE ${query.table} SET `
        result += `${query.data.fields.map((field, index) => `${field} = ${query.data.values[index]}`).join(', ')}${where}`;
        return result;
    }
}