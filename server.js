const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(cors());

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

if (app.get('env') === 'development') {
	mongoose.connect(`mongodb://localhost/${process.env.LOCAL_DB_NAME}`);
} else {
	mongoose.connect(`mongodb+srv://${process.env.ATLAS_DB_USERNAME}:${process.env.ATLAS_DB_PASSWORD}@cluster0-e2xpz.mongodb.net/${ATLAS_DB_NAME});
}

app.use(bodyParser.json());

require('./routes/home.route')(app);
require('./routes/athlete.route')(app);
require('./routes/user.route')(app);
require('./routes/club.route')(app);
require('./routes/scholarship.route')(app);

app.listen(PORT, () => {
	console.log(`server works at port ${PORT}`);
});