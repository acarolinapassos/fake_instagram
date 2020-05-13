const VerificarUsuarioLogado = (req,res,next) =>{
    // se a session do usuario não estiver setada, redireciona para login
if(!req.session.usuario){
    res.redirect('/login?error=2')
}

// se chegou ate aqui a session está ok

next();
}

module.exports= VerificarUsuarioLogado;