'use strict';

exports.index = function (req, res, next) {
    var images = req.body;
    console.log('==============');
    console.log(req.file);
    console.log('==============');
    /* save images here */
    res.status(200).end();
};

