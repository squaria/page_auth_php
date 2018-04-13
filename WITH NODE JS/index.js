const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto');

/*
  Config
*/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'prj_auth'
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(express.static('www'));

/*
  Regles routes
*/
app.post('/auth', function (request, response) {

  console.log('request', request.body);
  const user = request.body.name;
  const pwd = request.body.pass;
  let hashPwd = '';

  if ((user === undefined || user.length === 0) && (pwd === undefined || pwd.length === 0)) {
    // pas bien, on s'arrete la
    response.send('{"err":true}');
    return;
  }

  hashPwd = crypto.createHash('sha256')
    .update(pwd)
    .digest('hex');
  console.log('hash calculé', hashPwd)

  const reqSQL = 'SELECT count(*) FROM user WHERE user_name=' + connection.escape(user) + ' AND user_pass=' + connection.escape(hashPwd) + '';
  console.log('reqSQL', reqSQL);

  connection.query(reqSQL, function (err, rows) {
    if (err) {
      throw err;
    } else {
      const nbResult = Number.parseInt(rows[0]['count(*)']);
      console.log('nbResult', nbResult);
      if (nbResult === 0) {
        response.send('{"trouvé": false}');
      } else {
        response.send('{"trouvé": true}');
      }
    }
  });



});

//ok jai tout config, jecoute maintenant
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})