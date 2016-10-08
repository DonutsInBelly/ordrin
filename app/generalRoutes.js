module.exports = {
  init
}

function init(app) {
  app.get('/', (req, res)=>{
    res.sendFile('index.html');
  })
}
