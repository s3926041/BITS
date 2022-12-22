const express = require("express");
const router = express.Router();

const axios = require('axios');

// and we need jsdom and Readability to parse the article HTML
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=324d2f8ad6f84392b46230f0f48bce55';

// router.get('/',async(req,res)=>{
//   let firstResult = ''

// // First lets get some search data from News API

// // Build the URL we are going request. This will get articles related to Apple and sort them newest first
// axios.get(url).then((data)=> {firstResult=data
// console.log(data)}


  
// )
// // axios.get(firstResult.url).then(function(r2) {

// //   // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
// //   let dom = new JSDOM(r2.data, {
// //     url: firstResult.url
// //   });

// //   // now pass the DOM document into readability to parse
// //   let article = new Readability(dom.window.document).parse();

// //   // Done! The article content is in the textContent property
// //   console.log(article.textContent);
// // })

// res.json(firstResult)
// })


module.exports = router;