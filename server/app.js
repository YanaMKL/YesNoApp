const express = require('express');
const request = require('request');
const path    = require('path');
const fs      = require('fs');
var cors      = require('cors');

//  Load Config File
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname,'config.json')));

//  Set default server port
config.port = process.env.PORT || config.port;


//  Create Server
const server = express();

//  Allow CORS
server.use(cors())

//  Set public directory for static HTML
server.use(express.static(path.join(__dirname, '../public')));
server.use('/yes', express.static(path.join(__dirname, '../public')));


//  Routes
server.get('/api', (req, res) => {
    
    var answer = Boolean(Math.round(Math.random()));
    var yesOrNo = answer === true ? 'yes' : 'no';
    var api_url = `http://api.giphy.com/v1/gifs/random?api_key=${config.giphy_api_key}&limit=1&tag=${yesOrNo}`;
    var text;
    
     request(api_url, (err, response, body) => {
         
            
       if(err)
         return res.status(500).send({message: err});
       else {

        //  Parse Giphy Response
        let giphyResponse = JSON.parse(body); 

        //  Randomize "Yes" or "No" text
        text = config.terms[yesOrNo][ Math.floor(Math.random() * config.terms[yesOrNo].length) ];

        //  Return JSON
        return res.send({
          answer: yesOrNo,
          text: text,
          image: giphyResponse.data.image_original_url
        })
       }


     });
});

server.get('/yes', (req, res) => {

  var yesOrNo = 'yes';
  var api_url = `http://api.giphy.com/v1/gifs/random?api_key=${config.giphy_api_key}&limit=1&tag=${yesOrNo}`;
  var text;
  
   request(api_url, (err, response, body) => {
       
          
     if(err)
       return res.status(500).send({message: err});
     else {

      //  Parse Giphy Response
      let giphyResponse = JSON.parse(body); 

        //  Randomize "Yes" text
        text = config.terms[yesOrNo][ Math.floor(Math.random() * config.terms[yesOrNo].length) ]

        //  Return JSON
        return res.send({
          answer: yesOrNo,
          text: text,
          image: giphyResponse.data.image_original_url
        })
       }
      
   });  
  
});

server.get('/no', (req, res) => {

  var yesOrNo = 'no';
  var api_url = `http://api.giphy.com/v1/gifs/random?api_key=${config.giphy_api_key}&limit=1&tag=${yesOrNo}`;
  var text;
  
   request(api_url, (err, response, body) => {
       
          
     if(err)
       return res.status(500).send({message: err});
     else {

      //  Parse Giphy Response
      let giphyResponse = JSON.parse(body); 

        //  Randomize "No" text
        text = config.terms[yesOrNo][ Math.floor(Math.random() * config.terms[yesOrNo].length) ]

        //  Return JSON
        return res.send({
          answer: yesOrNo,
          text: text,
          image: giphyResponse.data.image_original_url
        })
       }

   });  
  
});

// start server
server.listen(config.port, function(){

  console.log(' new server started on port 3000 ...');
    
});
