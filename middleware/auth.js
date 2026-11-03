const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    // Check kung may token
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = header.split(' ')[1];

    try {
        // I-verify ang token gamit ang secret sa .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // I-save ang user info sa request
        next(); // Payagan nang pumasok
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};