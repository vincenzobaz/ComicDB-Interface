const queries = require('./query.js');

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
    
    return [{
        tableName: fields[0]['orgTable'],
        fieldNames: fieldNames,
        data: data.map(e => fieldNames.map(fName => e[fName]))
    }];
};

const prepareJson = (data, fields, flat) => {
    if (data.length == 0) return data;
    return flat ? prepareSimpleResult(data, fields) : prepareMultipleResults(data, fields);
};

const search = dbconnection => (req, res) => {
        let query = req.body.enabledTables.filter(t => queries.hasOwnProperty(t))
                                          .map(t => queries[t](req.body.string))
                                          .reduce((a, b) => a +'; ' + b);
        console.log('QUERY: ' + query);

        dbconnection.query(query, (dberr, dbres, fields) => {
            console.log('query completed');
            if (dberr) {
                console.log(JSON.stringify(dberr));
                res.sendStatus(400);
            }
            res.send(prepareJson(dbres, fields, req.body.enabledTables.length == 1));
        });
};


module.exports = search;