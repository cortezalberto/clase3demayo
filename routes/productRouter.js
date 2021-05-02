const express = require('express')

const router = express.Router()

const controller = require('../controller/productoController');


// requiero mi Middleware
const logDbMiddleware = require('../middlewares/logDbMiddleware')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

// Requiero express Validator como Midd
const { body} = require('express-validator');



const upload = multer({ storage });

const validaciones = [
   
    body('name').notEmpty().withMessage('En nombre no puede estar en blanco').bail()
    
    .isString().withMessage('Deber ser un String'),

    body('price').notEmpty().withMessage('En precio no puede estar en blanco'),
    body('descuento').notEmpty().withMessage('En descuento no puede estar en blanco'),
  
    body('image').custom((value, {req}) => {
     let file = req.file
     // Si es undefined, se relaciona con  Multer
     if ( !file) {
        throw new Error('Debe agregar una foto');
      }

     return true

    })
] 


const validacionesEdit = [
   
    body('name').notEmpty().withMessage('En nombre no puede estar en blanco').bail()
    
    .isString().withMessage('Deber ser un String'),

    body('price').notEmpty().withMessage('En precio no puede estar en blanco'),
    body('descuento').notEmpty().withMessage('En descuento no puede estar en blanco')
  
] 

// Formulario de creación de productos (GET)
router.get('/cart', controller.cart);

// Formulario de creación de productos (GET)
router.get('/create', controller.create);


// Detalle de un producto particular (GET)
router.get('/:id', controller.show);

// El get de la Barra de Búsqueda
router.get('/search', controller.search)


// Formulario de edición de productos (GET)
router.get('/:id/edit', controller.edit);

// Acción de creación (a donde se envía el formulario) (POST)

// Acción de creación (a donde se envía el formulario) (POST)
// cuidado con el parámetro de Single es el nombre del campo en el FORMULARIO
router.post('/store', upload.single('image'),validaciones, controller.store);
// advertir el segundo parámetro que es le avisa de 1 sólo archivo


// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/:id', upload.single('image'),validacionesEdit, controller.update);

// Acción de borrado (DELETE)
router.delete('/:id', controller.destroy);

module.exports = router;