
let queries = t =>  ['SELECT * FROM `Issues` WHERE `Issues`.`title` LIKE "%' + t + '%" OR `Issues`.`notes` LIKE "%' + t + '%"', 'SELECT * FROM `Countries` WHERE `Countries`.`name` LIKE "%' + t + '%s"'];

const search = dbconnection => (req, res) => {
        let query = queries(req.body.string).reduce((a, b) => a +'; ' + b);
        //let query = 'SELECT * FROM `Countries` WHERE `Countries`.`name` LIKE "%France%s"';
        console.log('QUERY: ' + query);

        dbconnection.query(query, (dberr, dbres, fields) => {
            if (dberr) {
                console.log(JSON.stringify(dberr));
                res.sendStatus(400);
            }
            let result = {};
            let tables = fields.map(q => q[0]['table'] );
            let fieldNames = fields.map(q => q.map(f => f['name']));

            for (let table = 0; table < tables.length; ++table) {
                result[tables[table]] = {
                    fieldNames : fieldNames[table],
                    data : dbres[table].map(e => fieldNames[table].map(fName => e[fName])),
                };
            }

            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        });
};


module.exports = search;