module.exports = (app) => {
    const journalInsert = require('../modules/journalInsert');
    const journalSelect = require('../modules/journalSelect');
    app
        .route('/add')
        .post(journalInsert.InsertData)
    app
        .route('/select')
        .post(journalSelect.SelectData)
}   
