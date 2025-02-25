const os = require('os');
const http = require('http');
const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/logout', (req, res) => {  
  res.redirect('https://pa-idps.auth0.com/logout?returnTo=https://auth0-alb-oidc-demo.identityplayground.com/logout_success')
});

app.get('/logout_success', (req, res) => {  
  res.clearCookie('AWSELBAuthSessionCookie-0')
  res.render('logout_success', {})
  
});

app.get('*', (req, res) => {
  res.render('index', {
    os: {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
      release: os.release()
    },
    headers: Object.keys(req.headers).sort().map((name) => ({ name, value: req.headers[name] })),
    env: Object.keys(process.env).sort().map((key) => ({ key, value: process.env[key] }))
  })
});

const port = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server on ${port}: ${err.message}`);
    return;
  }

  console.log(`Express listening on http://localhost:${port}`);
});