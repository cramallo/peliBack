// Initialize express router
let router = require('express').Router();
let movieController = require('./controllers/ShowController');
let userController = require('./controllers/UserController');
// Images for movies
const multer = require('multer');
const upload = multer({dest : 'uploads/'});

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

//EndPoint para buscar peliculas
router.get('/findMovies/:title',function(req,res)
{    
    movieController.findMovies(req,res);
});

router.post('/createMovie',upload.single('coverSource'),function(req,res)
{    
    console.log(req.file);
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