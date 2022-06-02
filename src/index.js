import InsertQuery from './insert/insert.js';
import SelectQuery from './select/select.js';

const insert = {

    operation: 'insert',
    table: 'table_name',

    data: {

        fields: ['name', 'age', 'car'],
        types: ['string', 'number', 'string'],
        values: ["Lucas", 25, "Opala"],
        where: ''
    }
}

console.log(InsertQuery(insert));

const select = {

    operation: 'select',
    from: 'table_name',
    all: false, // true to SELECT * FROM ...

    data: {

        fields: ['testimonials.id', 'writers.name', 'recipients.name', 'testimonials.message'],
        as: ['writer', 'recipient'],
        join: ['users writers', 'users recipients'],
        on: ['writers.id = testimonials."writerId"', 'recipients.id = testimonials."recipientId"'],
        where: 'id = 1'
    },
    params: {

        enabled: false,
        limit: 5,
        offset: 1,
        order: 'id',
    }
}

//console.log(SelectQuery(select));