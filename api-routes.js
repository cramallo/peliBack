// Initialize express router
let router = require('express').Router();
let showController = require('./controllers/ShowController');
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
    showController.getMovies(req,res);
});

//EndPoint para buscar peliculas
router.get('/movies/:title',function(req,res)
{    
    showController.findMovies(req,res);
});

//EndPoint para crear peliculas
router.post('/movies',function(req,res)
{        
    showController.createMovie(req,res);
});

//EndPoint para obtener los comentarios de una pelicula
router.get('/movies/:showid/comments',function(req,res){
    showController.getComments(req,res);
});

//EndPoint para crear un comentario de una pelicula
router.post('/movies/:showid/comment',function(req,res){
    showController.createComment(req,res);
});


//SERIES

//EndPoint para leer toda la base de series
router.get('/getSeries',function(req,res)
{    
    showController.getSeries(req,res);
});

//EndPoint para buscar series por titulo
router.get('/series/:title',function(req,res)
{    
    showController.findSeries(req,res);
});

//EndPoint para crear series
router.post('/series',function(req,res)
{       
    showController.createMovie(req,res);
});

//EndPoint para obtener los comentarios de una serie
router.get('/series/:showid/comments',function(req,res){
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

//EndPoint para obtener la informacion basica del usuario
router.post('/profile',function(req,res){
    userController.getUserData(req,res);
});


//EndPoint para modificar contraseña
router.put('/profile',function(req,res){  
    console.log("hollaaa");
    userController.changePassword(req,res);
});

//EndPoint para obtener las peliculas comentadas por el usuario
router.get('/profile/activity',function(req,res){
    userController.getMoviesCommented(req,res);
});



// Export API routes
module.exports = router;