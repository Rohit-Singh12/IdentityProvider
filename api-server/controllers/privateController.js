exports.getPrivateData = (req, res) => {
    return res.status(200).json({message: "This is private API"});
}