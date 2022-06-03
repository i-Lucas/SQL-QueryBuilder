# SQL Query Generator

* Create your query strings dynamically through objects
* Don't worry about sql injections or sending wrong types

# Example of use SelectQuery

```js
npm i sql-querybuilder-tool

import QueryBuilder from 'sql-querybuilder-tool/src/query/query.js';
```

* A simple select

```js
const simple = {

    operation: 'select',
    from: 'table_name',
    all: true, // fetching everything from a table
    where: 'id = 1' // where is required
}

const result = BuildQuery(simple)
result: SELECT * FROM table_name WHERE id = 1
```

* Another example
    
```js
const example = {

    operation: 'select',
    from: 'users',
    all: false,

    // in this case data is required
    data: {

        fields: ['users.id', 'users.name', 'users.email'],
        as: ['id', 'name', 'email'],
        join: [],
        on: [],
        where: ''
    },
    // params is optional
    params: {

        order: 'name',
        limit: 5,
        offset: 0
    }
}

const result = BuildQuery(example)
result: 

SELECT 
users.id AS "id", users.name AS "name", users.email AS "email" 
FROM users ORDER BY name LIMIT 5
```

* let's make it more complex

```js
const complex = {

    operation: 'select',
    from: 'courses',
    all: false,

    data: {

        fields: ['users.id', 'users.name', 'courses.name', 'schools.name', 'educations."endDate"'],
        as: ['course', 'school'],
        join: ['educations', 'users', 'schools'],
        on: ['courses.id = educations."courseId"', 'educations."userId" = users.id', 'schools.id = educations."schoolId"'],
        where: "users.id = 30 AND educations.status = 'finished'"
    },
    /*
    params: {

        order: 'courses.name',
        limit: 2,
        offset: 1
    }*/
}

const result = BuildQuery(complex)
result:

SELECT 
users.id AS "course", users.name AS "school", courses.name , schools.name , educations."endDate"
FROM courses JOIN educations ON courses.id = educations."courseId" 
JOIN users ON educations."userId" = users.id 
JOIN schools ON schools.id = educations."schoolId" 
WHERE users.id = 30 AND educations.status = 'finished'
ORDER BY courses.name LIMIT 2 OFFSET 1 // if you use the params object 
```

# Example of use InsertQuery

```js
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

const result = BuildQuery(insert)
result: 

INSERT INTO table_name ("name", "age", "car") VALUES (Lucas, 25, Opala) WHERE id = 1
```

# Example of use DeleteQuery

```js
const delete_ = {

    operation: 'delete',
    table: 'table_name',
    where: 'id = 1'
}

const result = BuildQuery(delete_)
result: 

DELETE FROM table_name WHERE id = 1
```

# Example of use UpdateQuery

```js
const update = {

    operation: 'update',
    table: 'table_name',

    data: {

        fields: ['"naMe"', 'age', 'car'],
        types: ['string', 'number', 'string'],
        values: ["'Lucas'", 25, "'Opala'"],
        where: 'id = 1'
    }
}

let result = BuildQuery(update)
result:
UPDATE table_name SET "naMe" = 'Lucas', age = 25, car = 'Opala' WHERE id = 1
```