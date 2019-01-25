var express = require('express');
var router = express.Router();
var meetingController = require('../controller/meetingController');

/* GET home page. */
router.get('/', function(req, res, next) {
    return meetingController.getNotes(req, res);
});


router.post('/', function(req, res, next) {
    var action = req.body.action;
    if(action === "filterByUser"){
        return meetingController.filterByUser(req, res);
    }
    
    if(action === "filetByProject"){
        return meetingController.filetByProject(req, res);
    }
    if(action === "loadMore"){
        return meetingController.loadMore(req, res);
    }
    if(action === "editNote"){
        return meetingController.editNote(req, res);
    }
});


// getting new meeting entry
router.get('/newEntry', function (req, res) {
    return meetingController.getEntry(req, res);
});

// adding new meeting entry
router.post('/newEntry', function (req, res) {
    return meetingController.createNewEntry(req, res);
});

router.post('/editNote', function (req, res) {
    console.log("Inside Router");
    return meetingController.editNote(req, res);
});

module.exports = router;
