const dynamoose = require('dynamoose');

exports.handler = async (event) => {

	const peopleSchema = new dynamoose.Schema({
		'id': Number,
		'name': String,
		'role': String
	});

	const peopleTable = dynamoose.model('people', peopleSchema);

	let data = null;
	let status = 500;

	try {
		data = await peopleTable.scan().exec();
		status = 200;
	} catch (e) {
		data = new Error(e);
		status = 400;
	}
	const response = {
		statusCode: status,
		body: JSON.stringify(data),
	};
	return response;
};

