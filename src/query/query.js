import InsertQuery from '../insert/insert.js';
import SelectQuery from '../select/select.js';
import DeleteQuery from '../delete/delete.js';
import UpdateQuery from '../update/update.js';

import ValidateInsertQuery from '../insert/validate.js';
import ValidateSelectQuery from '../select/validate.js';
import ValidateDeleteQuery from '../delete/validate.js';
import ValidateUpdateQuery from '../update/validate.js';

export default function BuildQuery(query) {

    let err = '';
    if (typeof query !== 'object') {
        err = 'Query must be an object\n';
        throw new Error(err);
    }
    if (!query.operation) {
        err = 'Query must have an operation\n';
        throw new Error(err);
    }
    if (query.operation !== 'insert' && query.operation !== 'select'
        && query.operation !== 'delete' && query.operation !== 'update') {
        err = 'Operation must be insert, select, delete or update\n';
        throw new Error(err);
    }

    if (query.operation === 'insert') {
        if (ValidateInsertQuery(query)) {
            return InsertQuery(query);
        }
    }
    if (query.operation === 'select') {
        if (ValidateSelectQuery(query)) {
            return SelectQuery(query);
        }
    }
    if (query.operation === 'delete') {
        if (ValidateDeleteQuery(query)) {
            return DeleteQuery(query);
        }
    }
    if (query.operation === 'update') {
        if (ValidateUpdateQuery(query)) {
            return UpdateQuery(query);
        }
    }
}