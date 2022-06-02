import ValidateSelectQuery from "./validate.js";

/**
 * @param Object
 * @returns query string
 * @description build the select query dinamically
 
    @example

    SelectQuery({
      
        operation: 'select',
        from: 'courses',
        all: false, // true: SELECT * FROM ...
        data: {
            fields: ['users.id', 'users.name', 'courses.name', 'schools.name', 'jobs."endDate"'],
            as: ['', '', 'course', 'school', ''],
            join: ['jobs', 'users', 'schools'],
            on: ['courses.id = jobs."courseId"', 'jobs."userId" = users.id', 'schools.id = jobs."schoolId"'],
            where: "users.id = 30 AND jobs.status = 'finished'"
        }, 
        params: {
            disabled: true,
            limit: 10,
            offset: 0,
            order : false
        }
    })
     
    returns ( string )
    SELECT users.id , users.name , courses.name AS "course", schools.name AS "school", jobs."endDate" 
    FROM courses 
    JOIN jobs 
    ON courses.id = jobs."courseId" 
    JOIN users ON jobs."userId" = users.id 
    JOIN schools ON schools.id = jobs."schoolId" 
    WHERE users.id = 30 AND jobs.status = 'finished'

    @example

    SelectQuery({
      
        operation: 'select',
        from: 'users',
        all: false, // true: SELECT * FROM ...
        data: {
            fields: ['users.id', 'users.name', 'roles.name', 'companies.name', 'jobs."startDate"'],
            as: ['', '', 'role', 'company', ''],
            join: ['jobs', 'roles', 'companies'],
            on: ['jobs."userId" = users.id', 'jobs."roleId" = roles.id', 'jobs."companyId" = companies.id'],
            where: 'users.id = 50 AND jobs."endDate" IS NULL'
        },
        params: {
            disabled: false,
            limit: 5,
            offset: 0,
            order : false
        }
    })

    returns ( string )
    SELECT users.id, users.name, roles.name AS "role", companies.name AS company, jobs."startDate"
    FROM users
    JOIN jobs
    ON jobs."userId" = users.id
    JOIN roles
    ON jobs."roleId" = roles.id
    JOIN companies
    ON jobs."companyId" = companies.id
    WHERE users.id = 50 AND jobs."endDate" IS NULL
    LIMIT 5 ORDER BY id // enabled parameters

 */

export default function SelectQuery(query) {

    if (ValidateSelectQuery(query)) {

        let fields = ``
        let JoinOn = '';
        let result = `SELECT `;

        query.all ?
            fields = `*` :
            fields = query.data.fields.map((field, index) => {
                if (query.data.as.length > 0) { return `${field} ${query.data.as[index] ? `AS "${query.data.as[index]}"` : ''}`; }
                else { return field; }
            }).join(', ');

        query.data.join.length > 0 ?
            JoinOn = query.data.join.map((join, index) => {
                return `JOIN ${join} ON ${query.data.on[index]}`
            }).join(' ') : JoinOn = '';

        result += fields + `FROM ${query.from} ${JoinOn} ${query.data.where !== '' ? `WHERE ${query.data.where}` : ''}`;

        if (query.params) {
            if(query.params.enabled) {
                result += ` LIMIT ${query.params.limit} ${query.params.offset ? 'OFFSET ' + query.params.offset : ''}`;
                query.params.order ? result += ` ORDER BY ${query.params.order}` : result += '';
            }
        }
        return result;
    }
}