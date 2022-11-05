

export const handleServerError = (req, res, next) => {
    try {
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}