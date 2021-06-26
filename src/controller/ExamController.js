const UserModel = require('../models/User');
module.exports = {
    async index(request, response) {
        // console.log(request.session);
        return response.render('Home/index', { title: "Página Inicial" });
    },


  

}