var Produto = require('../models/produto.js');
var Fornecedor = require('../models/fornecedor.js');
var Categoria = require('../models/categoria.js');
var access = require('../access.js');

module.exports = function(app) {
    app.get('/produtos', function(req, res) {
        Produto.find({deletado: {$ne: true} }).populate('fornecedor').populate('categoria').exec(function(err, produtos) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                console.log(produtos);
                
                res.render("produtos/produtos", {produtos: produtos});
            }
        })
    });    

    app.get('/produtos/new', function(req, res) {
        Fornecedor.find( {deletado: {$ne: true} }, function(err, fornecedores) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                Categoria.find( {deletado: {$ne: true} }, function(err, categorias) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {
                        res.render("produtos/addProduto", { fornecedores: fornecedores, categorias: categorias });
                    }
                });
            }
        });
    }); 

    app.get('/produto/edit/:_id', function(req, res) {
        console.log(req.params._id);
        Produto.findById({_id: req.params._id}).populate('fornecedor').populate('categoria').exec(function(err, produto) {
            console.log("produto");
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                Fornecedor.find( {deletado: {$ne: true} }, function(err, fornecedores) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {
                        Categoria.find( {deletado: {$ne: true} }, function(err, categorias) {
                            if (err) {
                                access.redirect(req, res, true, 'error', null);
                            } else {
                                console.log(produto);
                                
                                res.render("produtos/editProduto", { produto: produto, fornecedores: fornecedores, categorias: categorias });

                            }
                        });
                    }
                });
            }
        });
    });

    //// Função de cadastrar produto.
    app.post('/produto/create', function(req, res) {

        if (req.body.codigo !== undefined && req.body.codigo !== "" &&
            req.body.nome !== undefined && req.body.nome !== "" &&
            req.body.fornecedor !== undefined && req.body.fornecedor !== "" &&
            req.body.categoria !== undefined && req.body.categoria !== "" &&
            req.body.tamanho !== undefined && req.body.tamanho !== "" &&
            req.body.precoCompra !== undefined && req.body.precoCompra !== "" &&
            req.body.precoVenda !== undefined && req.body.precoVenda !== "" &&
            req.body.descricao !== undefined && req.body.descricao !== "") {
                  
            var produto = new Produto();

            produto.codigo = req.body.codigo;
            produto.nome = req.body.nome;
            produto.fornecedor = req.body.fornecedor;
            produto.categoria = req.body.categoria;
            produto.tamanho = req.body.tamanho;
            produto.precoCompra = req.body.precoCompra;
            produto.precoVenda = req.body.precoVenda;
            produto.descricao = req.body.descricao;
            
            produto.save( function(err, obj) {
                if (err) {
                    access.redirect(req, res, true, 'error', null);
                } else {
                    res.json(obj)
                }
            })
        }   
    });


    app.put('/produto/update/:_id', function(req, res) {

        if (req.body.codigo !== undefined && req.body.codigo !== "" &&
            req.body.nome !== undefined && req.body.nome !== "" &&
            req.body.fornecedor !== undefined && req.body.fornecedor !== "" &&
            req.body.categoria !== undefined && req.body.categoria !== "" &&
            req.body.tamanho !== undefined && req.body.tamanho !== "" &&
            req.body.precoCompra !== undefined && req.body.precoCompra !== "" &&
            req.body.precoVenda !== undefined && req.body.precoVenda !== "" &&
            req.body.descricao !== undefined && req.body.descricao !== "") {
                
            Produto.findById({_id: req.params._id}, function(err, produto) {
                produto.codigo = req.body.codigo;
                produto.nome = req.body.nome;
                produto.fornecedor = req.body.fornecedor;
                produto.categoria = req.body.categoria;
                produto.tamanho = req.body.tamanho;
                produto.precoCompra = req.body.precoCompra;
                produto.precoVenda = req.body.precoVenda;
                produto.descricao = req.body.descricao;

                produto.save( function(err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {
                        res.json(obj)
                    }
                });

            });
        }   
    });


    app.put('/produto/delete/:_id', function(req, res) {
        Produto.findById({_id: req.params._id}, function(err, produto) {
 
            if (err || !produto) {
                access.redirect(req, res, true, 'error', err);
            } else {
                produto.deletado = true;
                
                produto.save(function (err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', err);
                    } else {
                        Produto.find({ deletado: { $ne: true } }).populate('fornecedor').populate('categoria').exec(function(err, produtos) {
                            if (err) {
                                access.redirect(req, res, true, 'error', err);
                            } else {
                                
                                res.json(produtos);
                            }

                        });
                    }
                })
            
            }
        })
    });
}
