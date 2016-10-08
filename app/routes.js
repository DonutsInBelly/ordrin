module.exports = {
  Handler
}

function Handler(app) {
  app.get('/', (req, res)=>{
    res.sendFile('index.html');
  });
}
