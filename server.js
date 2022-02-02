const app = require('./app')
require('dotenv').config();

const {connectMongo} = require('./db/connectionMongo')

const PORT = process.env.PORT || 3030;

const start = async () => {
  try {
    await connectMongo();
    console.log('Database connection successful');
    
    app.listen(PORT, (err) => {
      if (err) console.error('Error at aserver launch:', err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();


