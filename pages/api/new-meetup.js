import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://user131:QiIyK3HL2SPqPIFw@cluster0.tku7b.mongodb.net/mtps"
    );
    const db = client.db();
    const meetupCollections = db.collection("mtps");

    await meetupCollections.insertOne(data);
  }
}

export default handler;
