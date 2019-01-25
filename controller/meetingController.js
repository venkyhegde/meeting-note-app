var Meeting = require('../model/meetingModel');

var users = [];
var results;
var projects = [];
var loadMoreCount = 1;
var messages = ['Test'];

exports.createNewEntry= function(req, res){
    messages = ['Test'];
    console.log("Controller:"+req.body.userName);
    var newNote = new Meeting({
        name: req.body.userName,
        project: req.body.projectName,
        yestDayWork: req.body.yestDayWork,
        toDaysWork: req.body.toDaysWork,
        impediments: req.body.impediments
    });
    
    // saving the new note
    newNote.save(function (err) {
        if(err){
            var errorMsg = 'There was an error! '+err;
            messages.push(errorMsg);
            res.render('newentry',{title: 'New Meeting Note', messages: messages, users: users, projects:projects});
        } else{
            // redirect to home page after saving the data.
            res.redirect(301, '/');
        }
    });
    
    
    
};

exports.getNotes = function(req, res){
  
  var query = Meeting.find();
  // var object
    query.sort({createdOn: 'desc'})
      .limit(12)
      .exec(function (err, result) {
          console.log(result);
          for(var i = 0; i<result.length;i++){
              if (Array.isArray(users)) {
                  if(!users.includes(result[i].name)){
                      users.push(result[i].name);
                  }
              } else {
                  users = [result[i].name];
              }
              
              if(Array.isArray(projects)){
                  if(!projects.includes(result[i].project)){
                      projects.push(result[i].project);
                  }
              } else{
                  projects = [result[i].project];
              }
          }
          console.log(projects.length);
          console.log(users.length);
          results = result;
          res.render('index', {title: 'Homepage', notes: result, projects: projects, users: users, messages:''});
      })
  
};

exports.getEntry =  function(req, res) {
    
    res.render('newentry',{title: 'New Note', message:'', users:users, projects: projects});
}

exports.filterByUser= function(req, res) {
 
    var query = Meeting.find();
    var filter = req.body.userName;
    
    query.sort({createdOn: 'desc'})
    if(filter.length > 0 && filter !== 'all'){
        query.where({name: filter})
    }
    
    query.exec(function (err, result) {
        res.render('index', {title: 'Homepage', notes: result, projects:projects, users:users, messages:''});
    });
};


exports.filetByProject= function(req, res) {
    var query = Meeting.find();
    var filter = req.body.projectName;
    
    query.sort({createdOn: 'desc'})
    if(filter.length > 0 && filter !== 'all'){
        query.where({project: filter})
    }
    
    query.exec(function (err, result) {
        res.render('index', {title: 'Homepage', notes: result, projects: projects, users: users, messages:''});
    });
};

exports.loadMore = function (req, res) {
    var limitNum = ++loadMoreCount * 12;
   
    var query = Meeting.find();
    // var object
    query.sort({createdOn: 'desc'})
        .limit(limitNum)
        .exec(function (err, result) {
            console.log(result);
            res.render('index', {title: 'Homepage', notes: result, projects: projects, users: users, messages:''});
        })
}

exports.editNote = function (req, res) {
   
    console.log("Inside Edit Note");
    var yestDayWork = req.body.yesterdayWork;
    var todayWork = req.body.todayWork;
    var impediments = req.body.impediments;
    var _id = req.body.id;
    
    Meeting.findByIdAndUpdate(_id, { $set: { yestDayWork: yestDayWork, toDaysWork: todayWork, impediments:impediments}}, function (err, result) {
        if (err) {
            console.log(err);
        }else {
    
            var query = Meeting.find();
            // var object
            query.sort({createdOn: 'desc'})
                .limit(12)
                .exec(function (err, result) {
                    console.log(result);
                    results = result;
                    res.render('index', {title: 'Homepage', notes: result, projects: projects, users: users, messages:'Updated Successfully!'});
                })
        }
        
    });
    
    
}