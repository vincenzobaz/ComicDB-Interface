
let queries = {
    'Issues' : function(t) {return 'SELECT * FROM `Issues` WHERE `Issues`.`title` LIKE "%' + t + '%" OR `Issues`.`notes` LIKE "%' + t + '%"';},
    'Countries': function(t) {return 'SELECT * FROM `Countries` WHERE `Countries`.`name` LIKE "%' + t + '%"';}
};

const prepareMultipleResults = (data, fields) => {
    //let result = {};
    const tables = fields.map(q => q[0]['table'] );
    const fieldNames = fields.map(q => q.map(f => f['name']));

    return tables.map((t, idx) => {
        return {
            tableName: t,
            fieldNames: fieldNames[idx],
            data: data[idx].map(e => fieldNames[idx].map(fName => e[fName])),
        };
    });
};

const prepareSimpleResult = (data, fields) => {
    const tableName = fields[0]['table'];
    const fieldNames = fields.map(f => f['name']);
    
    return [{
        tableName: tableName,
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
            if (dberr) {
                console.log(JSON.stringify(dberr));
                res.sendStatus(400);
            }
            res.send(prepareJson(dbres, fields, req.body.enabledTables.length == 1));
        });
};


module.exports = search;