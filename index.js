/**
 * * reemobileNotif plugin for uptime project - https://github.com/fzaninotto/uptime
 * *
 * * |EN| Notifies all events (up, down, paused, restarted) by sending a
 * * HTTP POST request to the Freemobile SMS API URL. The request will 
 * * only work for users of the french mobile operator : freemobile
 * *
 * * |FR| Notifie tout les evenements de vos sondes en envoyant un requête POST
 * * vers l'API SMS de freemobile. Nécéssite un compte freemobile et avoir
 * * activer l'option gratuite de l'API SMS.
 * *
 * * |EN| To enable the plugin, add the configuration below in config/production.yaml
 * * |FR| Pour activer le plugin, rajouter la configuration suivante dans votre config/production.yaml
 * *
 * * plugins:
 * *    - ./plugins/freemobileNotif
 * *
 * * freemobileNotif:
 * *    user:   <identifiants freemobile>
 * *    pass:   <Api password>
 * *
 * */

var https = require('https');
var url = require('url');
var config = require('config').freemobileNotif;
var CheckEvent = require('../../models/checkEvent');

exports.initWebApp = function(options) {
  CheckEvent.on('afterInsert', function(checkEvent) {
    checkEvent.findCheck(function(err, check) {
            if (err)
                return console.error(err);

            freeUrl = "https://smsapi.free-mobile.fr/sendmsg?user=" + config.user + "&pass=" + config.pass + "&msg=Le service " + check.name + " vient de passer au status: " + checkEvent.message

            var options = url.parse(freeUrl);
            options.method = 'GET';
            options.rejectUnauthorized = 'False';

            var req = https.request(options, function(res) {

            });

            req.on('error', function(e) {
              console.log('Problem with free request: ' + freeUrl  + e.message);
            });

            req.end();
    });
  });
}
