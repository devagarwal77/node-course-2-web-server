const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log=` ${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n')
   next();
});

/*app.use((req,res,next) => {
  res.render('maintenance.hbs');
}) */

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req,res)=>{
  //res.send('<h1>Hello Express!!!!!!!</h1>');
    res.render('home.hbs',{
      pagetitle:'home page',
      welcomemessage: 'welcome User' ,
    }
  );
});
app.get('/about',(req,res)=> {
  res.render('about.hbs',{
    pagetitle: 'About page',
  });
});

app.get('/home',(req,res)=> {
  res.send('home page');
});

app.get('/Contact',(req,res)=> {
  res.send('comtact page');
});

app.get('/bad', (req,res) => {
  res.send({
        errorMessage: '<h1>unable to open</h1>'
  });
});

app.listen(3000, () =>{
  console.log('server is up on 3000 port');
});
