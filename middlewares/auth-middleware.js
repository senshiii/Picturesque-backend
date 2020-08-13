const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
	const authHeader = req.header('authorization'); // Bearer `TOKEN`
	if (!authHeader) return res.status(401).json({ message: 'Unauthorized request blocked.' });
	const token = authHeader.split(' ')[1];
	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	console.log(decoded);
	if (!decoded) return res.status(401).json({ message: 'Unauthorized request blocked.' });
	req.userId = decoded.id;
	next();
};
