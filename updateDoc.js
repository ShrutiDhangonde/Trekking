console.log("Testing");

var MongoClient = require('mongodb').MongoClient;
console.log("Client created");
//const url="mongodb+srv://shruti:Mongodb@2020@cluster0.5r6cq.mongodb.net/TEST?retryWrites=true&w=majority";

//"mongodb://localhost:27017/MyDb";
// Connect to the dburl
/*
MongoClient.connect(url, function (err, db) {
    
    db.collection('Persons', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        db.collection('Persons').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});
*/

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const url="mongodb+srv://shruti:Mongodb@2020@cluster0.5r6cq.mongodb.net/TEST?retryWrites=true&w=majority";


    const client = new MongoClient(url);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
       // await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });

       await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function updateListingByName(client, nameOfListing, updatedListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}
 

async function upsertListingByName(client, nameOfListing, updatedListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing },
                                    { $set: updatedListing },
                                    { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}