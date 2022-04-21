const axios = require('axios');
require('dotenv').config();

var appRouter = function (app) {

    app.get("/create-user", function (req, res) {
        const email = req.query.email;
        var options = {
            method: 'POST',
            url: 'https://samyapkowitz.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/json'},
            data: {
              grant_type: 'client_credentials',
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              audience: 'https://samyapkowitz.us.auth0.com/api/v2/'
            }
          };
        
        axios.request(options).then(function (response) {
            const token = response.data.access_token;
            // axios post to user endpoint
        }).catch(function (error) {
            console.error(error);
        });
    });
}
  
module.exports = appRouter;