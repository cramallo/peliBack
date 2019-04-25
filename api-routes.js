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
router.get('/movies/:title',function(req,res)
{    
    showController.findMovies(req,res);
});

//EndPoint para crear peliculas
router.post('/movies',upload.single('coverSource'),function(req,res)
{    
    console.log(req.file);
    showController.createMovie(req,res);
});

//EndPoint para obtener los comentarios de una pelicula
router.get('/movies/:showid',function(req,res){
    showController.getComments(req,res);
});

//EndPoint para crear un comentario de una pelicula
router.post('/movies/:showid/comment',function(req,res){
    showController.createComment(req,res);
});


//SERIES

//EndPoint para buscar series por titulo
router.get('/series/:title',function(req,res)
{    
    showController.findSeries(req,res);
});

//EndPoint para crear series
router.post('/series',upload.single('coverSource'),function(req,res)
{    
    console.log(req.file);
    showController.createMovie(req,res);
});

//EndPoint para obtener los comentarios de una serie
router.get('/series/:showid',function(req,res){
    showController.getComments(req,res);
});

//EndPoint para crear un comentario en una serie
router.post('/series/:showid/comment',function(req,res){
    showController.createComment(req,res);
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