const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Akhilaesh:meda.akhil@myatlasclusteredu.wv2czbn.mongodb.net/realtimeapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//   insert sample data in to the mongodb database
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// insert sample data in to databse
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('items', itemSchema);

async function insertData() {
  try {
    const item1 = new Item({ name: 'Item 1' });
    const item2 = new Item({ name: 'Item 2' });
    const item3 = new Item({ name: 'Item 3' });
    await item1.save();
    await item2.save();
    await item3.save();
    console.log('Data inserted successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}

insertData();


