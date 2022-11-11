import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('nextjs-mongodb-demo');
	const items = db.collection('items');

	const { body, method } = req;
	console.log(body);

	if (method === 'GET') {
		const allItems = await items.find({}).toArray();
		res.json({ status: 200, data: allItems });
	} else if (method === 'POST') {
		const newItems = await items.insertOne(body);
		res.json({ status: 200, data: newItems });
	}
}
