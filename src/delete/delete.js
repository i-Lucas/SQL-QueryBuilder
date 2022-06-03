import ValidateDeleteQuery from './validate.js';

export default function DeleteQuery(query) {

    if (ValidateDeleteQuery(query)) {
        let sql = `DELETE FROM ${query.table}`;
        if (query.where) { sql += ` WHERE ${query.where}`; }
        return sql;
    }
}