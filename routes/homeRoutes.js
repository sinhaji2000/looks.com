const express = require('express') ;
const Router = express.Router() ;


Router.get('/' , (req , res) => {
    console.log(req.cookies)
    return res.send('<h1>hey</h1>') ;
})

module.exports = Router ;