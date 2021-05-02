
// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

// Requiero express Validator como Midd, destructurando
const { validationResult } = require('express-validator');



let productController = {

    home: (req, res) => {
        console.log('entro al home del produt controller y redirijo')

        res.redirect('/')

    },

    // Función que muestra el detalle del producto, cuando hacemos click en la foto
    show: (req, res) => {

        // Le delego al modelo la responsabilidad
        // que la busque por ID del registro seleccionado 
        // es por ello que atrapo em parámetro id  
        const product = productModel.find(req.params.id);
        console.log(product)
        if (product) {
            res.render('detailProduct', { product });
        } else {
            res.render('error404');
        }
    },

    // Función que muestra el formulario de crear Productos
    create: (req, res) => {
        console.log('Entre a create')
        res.render('createProduct');
    },
    // Función que simula el almacenamiento, en este caso en array
    store: (req, res) => {
        console.log('Entre a store')
        // Veo las propiedades de los campos
        console.log(req.body);
        // Veo las propiedades del archivo, esto viaja por post
        console.log(req.file);

        console.log('-----Verifico si hay errores');
        const errores = validationResult(req);
        // Esta instrucción muestra todo el array
        console.log(errores);

 //       console.log('-----MUESTRO EL LITERAL');
  //      erroresControlados= errores.mapped()
  //      console.log(erroresControlados);

        // se pregunta si existió al menos un error
        // la función mapped convierte un array en objeto literal
        // y ese objeto literal tiene una propiedad que se llama errors
        if (errores.errors.length > 0) {
            return res.render('createProduct', {
                erroresControlados: errores.mapped(),
                camposDevueltos: req.body

            });
        }



        // Atrapo los contenido del formulario
        const product = req.body;

        // Atrapo el nombre del archivo 

        product.image = req.file.filename
        console.log(product.image)

        // Delego la responsabilidad al modelo para crear producto  
        console.log(product)


        // Cuidado sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
        productModel.create(product);

        res.redirect('/')
    },

    // FUnción que muestra el formulario de edición
    edit: (req, res) => {
        // Delego al modelo que busque el producto     
        let product = productModel.find(req.params.id);

        console.log(product)
        if (product) {
            res.render('editProduct', { product });
        } else {
            res.render('error404');
        }
    },

    // Función que realiza cambios en el producto seleccionado
    update: (req, res) => {
        console.log("Entré al UPDATE llamó el STORE")
       
        console.log('imprimo los campos que vienen del body')
        // Veo las propiedades de los campos
        console.log(req.params.id)
        console.log(req.body);
        console.log(req.body.image);
        console.log(req.body.oldImage);


        // Veo las propiedades del archivo, esto viaja por post
        console.log('imprimo los campos que vienen del file')
        console.log(req.file);


        console.log('-----MUESTRO EL ARRAY DE ERRORES');
        const errores = validationResult(req);
        // Esta instrucción muestra todo el array
      
        console.log('imprimo errores')
        console.log(errores);

        
         // se pregunta si existió al menos un error
        // la función mapped convierte un array en objeto literal
        // y ese objeto literal tiene una propiedad que se llama errors
        if (errores.errors.length > 0) {
            return res.render('editProduct', {
                erroresControlados: errores.mapped(),
                camposDevueltos: req.body

            });
        }


        

        // Armo la estructura del registro auxiliar (product) 
        // Es decir almaceno en product los campos que vienen del formulario
        // Inclusive oldImage que no pertenece a la estructura
        let product = req.body;


        // SI no se envía foto nueva, req.body.image no viene definido
        if (req.file===undefined) {
            // quiere decir que no se cambia la foto   
            product.image = req.body.oldImage
             // Elimino de la estructura auxiliar, porque no existe en Json
            // Ojo este campo viene de la vista 
          //  delete product.oldImage;
        } else {
            // Actualizaron la foto, saco su nombre del proceso
            product.image = req.file.filename 
        }

        delete product.oldImage;

        product.id = req.params.id;
        //  console.log('Soy el nombre que viene del archivo :' + req.file.filename );

       
        console.log('.......PRODUCTO A MODIFICAR.......')

        console.log(product)


        // Delego la responsabilidad al modelo que actualice
        productModel.update(product);


        res.redirect('/')
    },

    // Función que elimina del Array visitados ek producto seleccionado
    destroy: (req, res) => {
        console.log('entre destroy')
        productModel.delete(req.params.id);

        // Ahora se mostrará todo porque los productos los varga de un archivo       
        res.redirect('/')
    },


    cart: (req, res) => {
        res.render('products/cart');
    },

    search: (req, res) => {

        let dataABuscar = req.query
        res.sed(dataABuscar)
    }

}


module.exports = productController
