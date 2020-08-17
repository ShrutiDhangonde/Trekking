var MongoClient = require('mongodb').MongoClient;
console.log("Client created");

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
 
        await deleteListingByName(client, "Cozy Cottage");

        //await deleteListingsScrapedBeforeDate(client, new date("2020-08-15"));
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function deleteListingByName(client, nameOfListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingsScrapedBeforeDate(client, date) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}