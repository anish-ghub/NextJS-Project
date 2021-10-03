import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {

  if (req.method === 'POST') {

    const data = req.body;

    // Establish Connection
    const client = await MongoClient.connect(
      'mongodb+srv://Anish_MB:importMongo@cluster0.3udzw.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });

  }

};

export default handler;