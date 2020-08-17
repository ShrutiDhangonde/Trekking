var MongoClient = require('mongodb').MongoClient;

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
 
        await findOneListingByName(client, "Infinite Views");
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function findOneListingByName(client, nameOfListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

