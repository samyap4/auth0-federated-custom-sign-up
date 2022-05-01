const axios = require('axios');
require('dotenv').config();

var appRouter = function (app) {

    app.get("/create-user", function (req, res) {
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
            // axios post to create user endpoint
            var createOptions = {
                method: 'POST',
                url: 'https://samyapkowitz.us.auth0.com/api/v2/users',
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                data: {
                    email: "sam@amazon.com",
                    given_name: "Sam",
                    family_name: "Fracaro",
                    name: "Sam Fracaro",
                    nickname: "Sam",
                    connection: "Username-Password-Authentication",
                    password: "Auth0Dem0",
                    verify_email: false,
                    app_metadata: {
                        verified_phone: "+14048675309",
                        verified_email: "",  
                    },
                }
              };
              axios.request(createOptions).then(function (response) {
                res.status(200).send(response.data);
              }).catch(function (error) {
                console.error(error);
            });
        }).catch(function (error) {
            console.error(error);
        });
    });

    app.get("/link-user", function (req, res) {
        var primaryUserId = req.query.id;
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
            axios.get(encodeURI('https://samyapkowitz.us.auth0.com/api/v2/users-by-email?email=tony@upfluent.com'), {
            headers: {
                Authorization: 'Bearer ' + token
            },
        }).then((resp) => {
            var secondaryUserId = resp.data[0].user_id;
            // for (var user of resp.data) {
            //     console.log(user);
            //     if (user.identities[0].provider === 'auth0') {
            //         primaryUserId = user.user_id;
            //     } else if (user.identities[0].provider === 'oidc') {
            //         secondaryUserId = user.user_id;
            //     }
            // }
            var linkOptions = {
                method: 'POST',
                url: 'https://samyapkowitz.us.auth0.com/api/v2/users/' + primaryUserId + '/identities',
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                data: {
                    user_id: secondaryUserId,
                    provider: "oidc",
                }
            };
            axios.request(linkOptions).then(function (response) {
                console.log(response);
                }).then((resp) => {
                    res.status(200).send(response.data);
                }).catch((err) => {
                    console.error(err);
                    res.status(500).send(err);
                });
            }).catch((err) => {
                console.error(err);
                res.status(500).send(err);
            }); 
        }).catch(function (error) {
            console.error(error);
        });
    });
}
  
module.exports = appRouter;