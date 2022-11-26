const dateline = require('node-datetime');
const response = require('../utils/responses');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);



exports.SelectData = (req, res) => {

    var dt = dateline.create();
    var dateTime = dt.format('Y-m-d');
    const reqbody = req.body;
    const db_name = reqbody.db_name;
    const db_collection = reqbody.db_collection;

    async function run() {
        try {
            await mongoClient.connect();
            const db = mongoClient.db(db_name);
            const collection = db.collection(db_collection);
            let json = reqbody.json_data;
            let value = json.param2;
            var query = { param2: value };

            collection.find(json).toArray(function (err, result) {
                if (err) throw err;
                if(result.length > 0){
                    response.status(200, "success", result, res);
                }else{
                    response.status(102, "not found data", result, res);
                }
                
            });

        } catch (err) {
            response.status(300, err, {}, res);
        } finally {
            // await mongoClient.close();
        }
    }
    run();
}

