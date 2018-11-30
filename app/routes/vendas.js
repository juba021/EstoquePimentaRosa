
var Venda = require('../models/venda.js');
var Produto = require('../models/produto.js');
var Fornecedor = require('../models/fornecedor.js');
var Categoria = require('../models/categoria.js');
var access = require('../access.js');

module.exports = function(app) {
    app.get('/vendas', function(req, res) {
        Venda.find({deletado: {$ne: true}}).populate('produtos').exec(function(err, vendas) {
            
            
            res.render("vendas/vendas", {vendas: vendas});
        })
    });   
    
    app.get('/vendas/new', function(req, res) {
        Produto.find({deletado: {$ne: true}}).populate('fornecedor').populate('categoria').exec(function(err, produtos) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                res.render("vendas/addVendas", {produtos: produtos});
            }
        })
    });  

    app.get('/venda/edit/:_id', function(req, res) {
        ////deep populate 
        Venda.findById({_id: req.params._id}).populate({
                path: 'produtos',
                populate: {path: 'fornecedor'}
            }).populate({
                path: 'produtos',
                populate: {path: 'categoria'}
            })
        .exec(function(err, venda) {
            console.log(venda);
            
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                Produto.find({deletado: {$ne: true}}).populate('fornecedor').populate('categoria').exec(function(err, produtos) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    }
                    res.render("vendas/editVendas", {venda: venda, produtos: produtos});
                });
            }
        })
    });  

    app.post('/venda/create', function(req, res) {
        if (req.body.cliente !== undefined && req.body.cliente !== "" &&
            req.body.total !== undefined && req.body.total > 0 &&
            req.body.produtosVenda.length > 0) {
                
                var venda = new Venda();

                venda.cliente = req.body.cliente;
                venda.total = req.body.total;

                for (const produto of req.body.produtosVenda) {

                    venda.produtos.push(produto._id)
                    
                }

                venda.save(function(err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {

                        res.json(obj)
                    }
                });
    
        }
    });


    app.post('/venda/create', function(req, res) {
        if (req.body.cliente !== undefined && req.body.cliente !== "" &&
            req.body.total !== undefined && req.body.total > 0 &&
            req.body.produtosVenda.length > 0) {
                console.log(req.body.length)
                var venda = new Venda();

                venda.cliente = req.body.cliente;
                venda.total = req.body.total;

                for (const produto of req.body.produtosVenda) {
                    venda.produtos.push(produto._id)
                }

                venda.save(function(err, obj) {
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



    app.put('/venda/update/:id', function(req, res) {
        
        if (req.body.cliente !== undefined && req.body.cliente !== "" &&
            req.body.total !== undefined && req.body.total > 0 &&
            req.body.produtosVenda.length > 0) {
                
            Venda.findById({_id: req.params._id}, function(err, venda) {
                venda.cliente = req.body.cliente;
                venda.total = req.body.total;
                venda.produtos = [];
                for (const produto of req.body.produtosVenda) {
                    venda.produtos.push(produto._id)
                }

                venda.save( function(err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', null);
                    } else {
                        res.json(obj)
                    }
                });

            });
        } else {
            access.redirect(req, res, true, 'error', null);
        }
    });


    app.put('/venda/delete/:_id', function(req, res) {
        Venda.findById({_id: req.params._id}, function(err, venda) {
 
            if (err || !venda) {
                access.redirect(req, res, true, 'error', err);
            } else {
                venda.deletado = true;
                
                venda.save(function (err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', err);
                    } else {
                        Venda.find({ deletado: { $ne: true } }).populate('fornecedor').populate('categoria').exec(function(err, vendas) {
                            if (err) {
                                access.redirect(req, res, true, 'error', err);
                            } else {
                                
                                res.json(vendas);
                            }

                        });
                    }
                })
            
            }
        })
    });

}