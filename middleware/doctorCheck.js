exports.doctorCheck = (req, res, next) => {
    try {
        if (req.user.role == '2')
            next();
        else
            res.redirect('/404');
    } catch (err) {
        res.redirect('/404');
    }
}