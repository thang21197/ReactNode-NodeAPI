var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '123456',
  port: 5432,
})
client.connect()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getdata', function(req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  
  client
  .query('SELECT * FROM public.products')
  .then(result=>res.send(result.rows))
  .catch(e => console.error(e.stack))
  // .then(() => client.end())
  //  res.render('index', { title: 'Express' });
});
router.get('/add',function(req, res, next){
  res.render('add',{});
});
router.post('/add',function(req, res, next){
  var data=req.body;
  client
  .query('INSERT INTO products (product_name,product_price,product_image) values ($1,$2,$3)',[data.product_name,data.product_price,data.product_image],
   (err,response) =>{
     if(err){
       console.log('Error');
     }else{
      res.send('Đã nhận được dữ liệu')
     }
   })
});
module.exports = router;
