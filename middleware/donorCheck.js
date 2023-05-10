const jwt = require('jsonwebtoken');

exports.donorCheck = (req, res, next) => 
{
    const token = req.cookies.accessToken;
    if(!token) res.redirect('/404');
    try
    {
        const verified = jwt.verify(token, process.env.Access_Token_Secret);
        req.user = verified;
        if(req.user.role == '1')
            next();
        else
            res.redirect('/404');
    } catch (err) 
    {
        res.redirect('/404');
    }
}