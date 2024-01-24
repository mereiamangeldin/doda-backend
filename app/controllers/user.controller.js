exports.get = (req, res) => {
    res.json({
        userId: req.userId
    });
}