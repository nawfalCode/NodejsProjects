/*
 * GET home page.
 */
var exp = require('../dataModel/dataModel')
exports.index = function (req, res) {
    res.render('index.html', {
        title: 'Express',
        data: exp.dataItems
    });
};