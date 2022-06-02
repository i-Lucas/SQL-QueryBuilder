import InsertQuery from './insert/insert.js';
import SelectQuery from './select/select.js';
import DeleteQuery from './delete/delete.js';

const insert = {

    operation: 'insert',
    table: 'table_name',

    data: {

        fields: ['name', 'age', 'car'],
        types: ['string', 'number', 'string'],
        values: ["Lucas", 25, "Opala"],
        where: 'id = 1'
    }
}

//console.log(InsertQuery(insert));

const select = {

    operation: 'select',
    from: 'table_name',
    all: true, // true to SELECT * FROM ...
    where: 'id = 1',
    /*
        data: {
    
            fields: ['testimonials.id', 'writers.name', 'recipients.name', 'testimonials.message'],
            as: ['writer', 'recipient'],
            join: ['users writers', 'users recipients'],
            on: ['writers.id = testimonials."writerId"', 'recipients.id = testimonials."recipientId"'],
            where: 'true'
        },
        /*
        params: {
    
            limit: 5,
            offset: 1,
            order: 'id',
        }*/
}

//console.log(SelectQuery(select));

const delete_ = {

    operation: 'delete',
    table: 'table_name',
    where: 'id = 1'
}

console.log(DeleteQuery(delete_));
