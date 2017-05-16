const util = require('util');

const prepareMultipleResults = (data, fields) => {
    const fieldNames = fields.map(q => q.map(f => f['name']));

    return fields.map((t, idx) => {
        return {
            tableName: t[0]['orgTable'],
            fieldNames: fieldNames[idx],
            data: data[idx].map(e => fieldNames[idx].map(fName => e[fName])),
        };
    });
};

const prepareSimpleResult = (data, fields) => {
    const fieldNames = fields.map(f => f['name']);
    const result = data.map(e => fieldNames.map(fName => e[fName]));

    return [{
        tableName: fields[0]['orgTable'],
        fieldNames: fieldNames,
        data: fieldNames.length > 1 ? result : result.filter(el => el != null  && el != '')
    }];
};

const prepareJson = (data, fields, flat) => {
    if (data == null || data.length == 0) return data;
    return flat ? prepareSimpleResult(data, fields) : prepareMultipleResults(data, fields);
};


const run = (dbconnection, query, creq, cres, info = null) => {
    console.log('QUERY: ' + query);

    dbconnection.query(query, (dberr, dbres, fields) => {
        if (dberr != null) {
            console.log('MYSQL ERROR');
            console.log(util.inspect(dberr));
            cres.sendStatus(400);
            return;
        }
        console.log('query completed');
        cres.send({
            info: info,
            results: prepareJson(dbres, fields, query.indexOf(';') == -1)
        });
    });
};

module.exports = run;
