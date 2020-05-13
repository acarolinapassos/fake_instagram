// usar o model usuario para carregar um usuario
const {Usuario,Post,Comentario} = require('../models');
const bcrypt = require('bcrypt')

const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: async (req,res) => {
       let posts = await Post.findAll(
            {
                include:[
                    {
                        model: Comentario,
                        as:'comentarios',
                        include: 'usuario'
                    },
                    'usuario'
                ]
            
            }
            )
        res.render('index',{posts});
    },

    login: async (req,res) => {
    // lendo as info do req body

    const{ email, senha} = req.body;

    const user = await Usuario.findOne({where:{email}});

    console.log(user);
    if(!user){
        res.redirect('/login?error=1')
    }

    if(!bcrypt.compareSync(senha,user.senha)){
        res.redirect('/login?error=1')
    }

    // setar uma session com usuario
    req.session.usuario=user;


    // redirecionar o usuario para a home
    res.redirect('/home')


    }



}

module.exports = AuthController;