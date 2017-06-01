const idField = {
    'Issues': 'issue_id',
    'Countries' : 'country_code',
    'Brand_Groups': 'brand_group_id',
    'People': 'people_id',
    'Languages': 'language_code',
    'Indicia_Publishers': 'indicia_publisher_id',
    'Publishers': 'publisher_id'
};

const deleteEntry = (db, tableName, id) => {
    db.query(`DELETE FROM ${tableName} WHERE ${idField[tableName]} = ${id}`, (dberr, dbres) => {
        if (dberr != null) {
            console.log('MYSQL ERROR');
            console.log(util.inspect(dberr));
            cres.sendStatus(400);
            return;
        }
        console.log('Deleted ' + dbres.affectedRows + ' rows');
    });
};

module.exports = deleteEntry;
