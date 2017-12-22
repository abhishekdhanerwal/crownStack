var express=require('express');

var app=express();

// app.use(express.static(__dirname +'app'));
//
app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.sendfile('index.html');
});

// app.get('/data' , function (req, res) {
//
// })


app.listen(process.env.PORT || 3000,function(){
    console.log("Express Started on Port 3000");
});