const UserModel = require('../models/User');
const { hash} = require ('bcryptjs');

module.exports = {
    async index(request, response) {

        const UserList = await UserModel.findAll();

        return response.render('User/index', { title: "Usuários", UserList: UserList, search: {} });
    },


    async Search(request, response) {
        const { name, cpf, email } = request.body;

        var where = {};

        if (name)
            where.name = name;

        if (cpf)
            where.cpf = cpf;

        if (email)
            where.email = email;

        const UserList = await UserModel.findAll({
            where: where
        });

        return response.render('User/index', { title: "Usuários", UserList: UserList, search: { name, cpf, email } });
    },


    async create(request, response) {
        const { name, cpf, email } = request.body;
        return response.render('User/create', { title: "Criar Usuário", errorMessage: null, User: {} });
    },


    async createPOST(request, response) {
        const { name, cpf, email, phone, usertype, username, password, comfirmpassword } = request.body;
        if (password != comfirmpassword) {
            return response.render('User/create', { title: "Criar Usuário", errorMessage: "Senhas não são iguais", User: { name, cpf, email, phone, usertype, username }});
        }

        var newUser = {}
        if(name) newUser.name = name;
        if(cpf) newUser.cpf = cpf;
        if(email) newUser.email = email;
        if(phone) newUser.phone = phone;
        if(usertype) newUser.usertype = usertype;
        if(username) newUser.username = username;
        if(password) newUser.password = await hash(password, 8);


        await UserModel.create(newUser);

        return response.redirect('/User');
    },

    async edit(request, response) {
        const { id } = request.params;
        const User = await UserModel.findByPk(id);

        return response.render('User/edit', { title: "Editar Usuário", errorMessage: null, User: User });
    },


    async editPOST(request, response) {
        const {id, name, cpf, email, phone, usertype } = request.body;

        const User = await UserModel.findByPk(id);

        User.name = name;
        if(cpf) User.cpf = cpf; else User.cpf = null;
        if(email) User.email = email; else User.email = null;
        if(phone) User.phone = phone; else User.phone = null;
        User.usertype = usertype;


        await User.save();

        return response.redirect('/User');
    },


   



}