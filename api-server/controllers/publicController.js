exports.getPublicData = (req, res) => {
    return res.status(200).json({ message: "This is public API"});
}