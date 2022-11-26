const dateline = require('node-datetime');
const response = require('../utils/responses');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);

 

exports.InsertData = (req, res) => {

    async function run() {
        try {
            var dt = dateline.create();
            var dateTime = dt.format('Y-m-d');
            const reqbody = req.body;
            const db_name = reqbody.db_name;
            const db_collection = reqbody.db_collection;


            await mongoClient.connect();
            const db = mongoClient.db(db_name);
            const collection = db.collection(db_collection);
            let json = reqbody.json_data;
            const result = await collection.insertOne(json);

            
            console.log(result);
            if(result.acknowledged){
                response.status(200, "success", {}, res);
                return false;
            }else{
                response.status(101, "error", {}, res);
                return false;
            }
            
        } catch (err) {
            response.status(300, err, {}, res);
        } finally {
            await mongoClient.close();
        }
    }
    run();

}
