const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => 
{
    const token = req.cookies.accessToken;
    if(!token) return next();
    try
    {
        const verified = jwt.verify(token, process.env.Access_Token_Secret);
        req.user = verified;
        next();
    } catch (err) 
    {
        res.status(400).json({ message: 'Invalid token' }).redirect('/login');
    }
}