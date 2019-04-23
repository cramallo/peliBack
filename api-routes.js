// Initialize express router
let router = require('express').Router();
let movieController = require('./controllers/MovieController');
let userController = require('./controllers/UserController');

// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
});

//EndPoint para leer toda la base
router.get('/getMovies',function(req,res)
{    
    movieController.getMovies(req,res);
});


router.post('/createMovie',function(req,res)
{    
    movieController.createMovie(req,res);
});


router.post('/register',function(req,res){
    userController.register(req,res);
});

router.post('/login',function(req,res){
    userController.login(req,res);
});


// Export API routes
module.exports = router;