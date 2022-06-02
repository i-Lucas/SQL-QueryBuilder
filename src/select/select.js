import ValidateSelectQuery from "./validate.js";

/**
    * @param Object
    * @returns query string
    * @description build the select query dinamically
    * @example
    
    const select = {

        operation: 'select',
        from: 'table_name',
        all: false, // true: SELECT * FROM ...

        data: {
            fields: ['test.id', 'writers.name', 'recipients.name', 'test.message'],
            as: ['writer', 'recipient'],
            join: ['users writers', 'users recipients'],
            on: ['writers.id = test."writerId"', 'recipients.id = test."recipientId"'],
            where: 'id = 1'
        },
        params: {
            limit: 5,
            offset: 1,
            order: 'id',
        }
    }

    return:

    SELECT 
    test.id AS "writer", writers.name AS "recipient", recipients.name , test.message 
    FROM table_name 
    JOIN users writers ON writers.id = test."writerId" 
    JOIN users recipients ON recipients.id = test."recipientId" 
    WHERE id = 1 ORDER BY id LIMIT 5 OFFSET 1
 */

export default function SelectQuery(query) {

    if (ValidateSelectQuery(query)) {

        let where = '';
        let data_disabled = query.all
        where = data_disabled ? `${query.where}` : `${query.data.where}`;

        let fields = `*`
        let JoinOn = '';
        let result = `SELECT `;

        if (!data_disabled) {
            fields = query.data.fields.map((field, index) => {
                if (query.data.as.length > 0) { return `${field} ${query.data.as[index] ? `AS "${query.data.as[index]}"` : ''}`; }
                else { return field; }
            }).join(', ');

            query.data.join.length > 0 ?
                JoinOn = query.data.join.map((join, index) => {
                    return `JOIN ${join} ON ${query.data.on[index]}`
                }).join(' ') : JoinOn = '';
        }

        result += `${fields} FROM ${query.from} ${JoinOn} WHERE ${where}`;

        if (query.params) {
            query.params.order !== '' ? result += ` ORDER BY ${query.params.order}` : result += '';
            result += ` LIMIT ${query.params.limit} ${query.params.offset ? 'OFFSET ' + query.params.offset : ''}`;
        }
        return result;
    }
}