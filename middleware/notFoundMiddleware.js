function notFoundMiddleware(req, res, next) {
    res.status(404).send("not found");
}

module.exports = {notFoundMiddleware};