var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var buildingRouter = require('./routes/building');
var addBuildingRouter = require('./routes/add_building');
var editBuildingRouter = require('./routes/edit_building');
var delete_building_router = require('./routes/delete_building');

var latestRouter = require('./routes/latest');
var signupRouter = require('./routes/signup');
var signupConfirmRouter = require('./routes/signup_confirm');
var loginRouter = require('./routes/login');

var add_report_router = require('./routes/add_report');
var editReportRouter = require('./routes/edit_report');
var deleteReportRouter = require('./routes/delete_report');

var projectsRouter = require('./routes/projects');
var addProjectRouter = require('./routes/add_project');
var projectDetailRouter = require('./routes/project');
var editProject = require('./routes/edit_project');
var deleteProject = require('./routes/delete_project');

var user_router = require('./routes/user');
var users_router = require('./routes/users');
var add_user_router = require('./routes/add_user');
var edit_user_router = require('./routes/edit_user');
var delete_user_router = require('./routes/delete_user');
var vendor_router = require('./routes/vendor');
var edit_vendor_router = require('./routes/edit_vendor');
var delete_vendor_router = require('./routes/delete_vendor');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// latest(top)
app.use('/latest', latestRouter);

// signup
app.use('/signup', signupRouter);
app.use('/signup_confirm', signupConfirmRouter);

// login
app.use('/login', loginRouter);

// building
app.use('/building', buildingRouter);
app.use('/add_building', addBuildingRouter);
app.use('/edit_building', editBuildingRouter);
app.use('/delete_building', delete_building_router);

// report
app.use('/add_report', add_report_router);
app.use('/edit_report', editReportRouter);
app.use('/delete_report', deleteReportRouter);

// project
app.use('/project', projectDetailRouter);
app.use('/projects', projectsRouter);
app.use('/add_project', addProjectRouter);
app.use('/edit_project', editProject);
app.use('/delete_project', deleteProject);

// management
app.use('/user', user_router);
app.use('/users', users_router);
app.use('/add_user', add_user_router);
app.use('/edit_user', edit_user_router);
app.use('/delete_user', delete_user_router);
app.use('/vendor', vendor_router);
app.use('/edit_vendor', edit_vendor_router);
app.use('/delete_vendor', delete_vendor_router);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
