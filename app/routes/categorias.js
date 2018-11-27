var Categoria = require('../models/categoria.js');
var access = require('../access.js');

module.exports = function(app) {
    app.get('/categorias', function(req, res) {
        Categoria.find({deletado: { $ne: true }}, function(err, categorias) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                res.render("categorias/categorias", { categorias: categorias });
            }
        })
    });   
    
    app.get('/categorias/new', function(req, res) {
        res.render("categorias/addCategoria");
    });  

    app.get('/categorias/edit/:_id' , function(req, res) {
        Categoria.findById({_id: req.params._id}, function(err, categoria) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                res.render("categorias/editCategoria", { categoria: categoria });
            }
        })
    });  

    app.post('/categoria/create', function(req, res) {
        if (req.body.codigo !== undefined && req.body.codigo !== "" &&
            req.body.nome !== undefined && req.body.nome !== "") {
                
                var categoria = new Categoria();
                categoria.codigo = req.body.codigo;
                categoria.nome = req.body.nome;

                categoria.save( function(err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {
                        res.json(obj)
                    }
                });
            } else {
                access.redirect(req, res, true, 'error', null);
            }
    });

    app.put('/categoria/update/:_id', function(req, res) {
        if (req.body.codigo !== undefined && req.body.codigo !== "" &&
            req.body.nome !== undefined && req.body.nome !== "") {

                Categoria.findById({_id: req.params._id}, function(err, categoria) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {
                        categoria.codigo = req.body.codigo;
                        categoria.nome = req.body.nome;
                        
                        categoria.save(function(err,obj) {
                            if (err) {
                                access.redirect(req, res, true, 'error', null);
                            } else {
                                res.sendStatus(200);
                            }
                        });
                    }
                });

            } else {
                access.redirect(req, res, true, 'error', null);
            }
    });


    app.put('/categoria/delete/:_id', function(req, res) {
        Categoria.findById({_id: req.params._id}, function(err, categoria) {
            if (err || !categoria) {
                access.redirect(req, res, true, 'error', err);
            } else {
                categoria.deletado = true;
                
                categoria.save(function (err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', err);
                    } else {
                        Categoria.find({ deletado: { $ne: true } }, function(err, categoria) {
                            if (err) {
                                access.redirect(req, res, true, 'error', err);
                            } else {
                                res.json(categoria);
                            }

                        });
                    }
                })
            
            }
        })
    });
}