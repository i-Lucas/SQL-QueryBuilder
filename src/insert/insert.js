import ValidateInsertQuery from "./validate.js";

/**
 * @param Object
 * @returns query string
 * @description build the insert query dinamically
 
    @example

    InsertQuery({
    
        operation: 'insert',
        table: 'table_name',
        data: {

            fields: ['name', 'age', 'height'],
            types: ['string', 'number', 'number'],
            values: ['Lucas', 25, 1.82],
            where: 'id = 1' // empty string to not use
        }
    })
     
    returns ( string )
    INSERT INTO table_name ("name", "age", "height") VALUES ('Lucas', 25, 1.82) WHERE id = 1
 */

export default function InsertQuery(query) {

    if (ValidateInsertQuery(query)) {

        let result = `INSERT INTO ${query.table} (${query.data.fields.map(field => `"${field}"`).join(', ')}) VALUES (${query.data.values.join(', ')})`;
        if (query.data.where !== '') { result += ` WHERE ${query.data.where}`; }
        return result;
    }
}