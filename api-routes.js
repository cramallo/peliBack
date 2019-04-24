// Initialize express router
let router = require('express').Router();
let showController = require('./controllers/ShowController');
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
    showController.getMovies(req,res);
});

//EndPoint para buscar peliculas
router.get('/findMovies/:title',function(req,res)
{    
    showController.findMovies(req,res);
});

router.post('/createMovie',upload.single('coverSource'),function(req,res)
{    
    console.log(req.file);
    showController.createMovie(req,res);
});

//detalle movie
router.get('movie/:id',function(req,res){
    
});

router.post('/movie/:id/comment',function(req,res){

});


//USER

router.post('/register',function(req,res){
    userController.register(req,res);
});

router.post('/login',function(req,res){
    userController.login(req,res);
});




// Export API routes
module.exports = router;