# SQL Query Generator

* Create your query strings dynamically through objects
* Don't worry about sql injections or sending wrong types

# Example of use SelectQuery

* A simple select

```js
const simple = {

    operation: 'select',
    from: 'table_name',
    all: true,

    data: {

        fields: [],
        as: [],
        join: [],
        on: [],
        where: 'id = 1'
    }
}

const result = SelectQuery(simple)
result: SELECT * FROM table_name WHERE id = 1
```

* Another example
    
```js
const example = {

    operation: 'select',
    from: 'users',
    all: false,

    data: {

        fields: ['users.id', 'users.name', 'users.email'],
        as: ['id', 'name', 'email'],
        join: [],
        on: [],
        where: ''
    },
    params: {

        order: 'name',
        limit: 5,
        offset: 0
    }
}

const result = SelectQuery(example)
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
    all: false, // true to select all fields

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

const result = SelectQuery(complex)
result:

SELECT 
users.id AS "course", users.name AS "school", courses.name , schools.name , educations."endDate"
FROM courses JOIN educations ON courses.id = educations."courseId" 
JOIN users ON educations."userId" = users.id 
JOIN schools ON schools.id = educations."schoolId" 
WHERE users.id = 30 AND educations.status = 'finished'

// if you use the params object the line below would be inserted in your query
ORDER BY courses.name LIMIT 2 OFFSET 1
```