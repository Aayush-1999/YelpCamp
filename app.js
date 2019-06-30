   var express            = require("express"),
    app                   = express(),
    bodyparser            = require("body-parser"),
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash");
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession        = require("express-session"),
    methodOverride        = require("method-override"),
    Campground            = require("./models/campground"),
    Comments              = require("./models/comments"),
    User                  = require("./models/user"),
    seed                  = require("./seed");

//ROUTES
var campgroundRoute = require("./routes/campgrounds"),
    commentRoute    = require("./routes/comments"),
    indexRoute      = require("./routes/index");

// mongoose.connect("mongodb://127.0.0.1/camp_data",{useNewUrlParser:true});
mongoose.connect("mongodb+srv://aayush-agarwal:A2@agarwal@cluster0-xtzpv.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
//seed();

//PASSPORT CONFIGURATION
app.use(expressSession({
    secret: "Jon knows Knothing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error  =  req.flash("error");
   res.locals.success  =  req.flash("success");
   next();
});

app.use("/campground",campgroundRoute);
app.use("/campground/:id/comments",commentRoute);
app.use("/",indexRoute);

app.listen(process.env.PORT||3000,process.env.IP)
{
   console.log("Server has started"); 
};