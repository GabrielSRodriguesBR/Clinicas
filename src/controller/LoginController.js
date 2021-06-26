

const UserModel = require('../models/User');
const bcrypt = require ('bcryptjs');


module.exports = {
    async index(request, response) {
        return response.render('Login/index', { title: "Página Inicial" });
    },




    async Auth(request, response) {

        const {username, password} = request.body;


        var user = await UserModel.findOne({ where: { username: username} });
        if(user == null)
            return response.render('Login/index', { title: "Página Inicial", msg: "Usuário não localizado" });

        var compare = await bcrypt.compare(password, user.password)

        console.log(compare);

        if(!compare)
            return response.render('Login/index', { title: "Página Inicial", msg: "Usuário não localizado" });

        var session = request.session;
        session.user_id = user.id;
        session.user_name = user.name;
        session.user_type = user.usertype;


        return response.render('Home/index', { title: "Página Inicial" });
    },

    async Logout(request, response) {

        request.logout();
        response.redirect('/');


        return response.redirect('/');
    },

   




}