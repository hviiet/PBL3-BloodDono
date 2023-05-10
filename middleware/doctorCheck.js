const jwt = require('jsonwebtoken');

exports.doctorCheck = (req, res, next) => 
{
    const token = req.cookies.accessToken;
    if(!token) return res.redirect('/404');
    try
    {
        const verified = jwt.verify(token, process.env.Access_Token_Secret);
        req.user = verified;
        if(req.user.role == '2')
            next();
        else
            res.redirect('/404');
    } catch (err) 
    {
        res.redirect('/404');
    }
}