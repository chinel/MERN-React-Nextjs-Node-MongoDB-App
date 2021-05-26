exports.time = (req, res) =>{
    res.json({date: new Date().toString()});
}