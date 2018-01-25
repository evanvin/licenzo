/*
  Soundex - v0.2.1 - Node.js & Browser
  By Louis T. <louist@ltdev.im>
  https://github.com/LouisT/node-soundex/
*/
var Soundex = require('./');
var tests = [
    {words: ["Euler","Ellery"],value:"E460"},
    {words: ["Hilbert","Heilbronn"], value: "H416"}, 
    {words: ["Lukasiewicz","Lissajous"], value: "L222"},
    {words: ["Testing this","Testing that"],scale:true,value:"T23523"},
    {words: ["The quick brown fox jumped over the lazy dog."],scale:true,value:"T2216512513163423"},
    {words: ["The quick brown fox jumped over the lazy dog."],scale:true,mysql:true,value:"T2165125131634232"},
    {words: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum."],scale:true,value:"L65125346235325223363125243545363"},
    {words: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum."],scale:true,mysql:true,value:"L6512534623532523631252435453635"}
];
for (var num in tests) {
    var test = tests[num];
    if (test.words.length > 1) {
       var first = Soundex(test.words[0],(test.scale?true:false));
       var second = Soundex(test.words[1],(test.scale?true:false));
       if ((first == second) && first == test.value) {
          console.log('Both '+test.words[0]+' and '+test.words[1]+' are '+first+'!');
        } else {
          console.log('FAILED! '+test.words[0]+' is '+first+' and '+test.words[1]+' is '+second+', should be '+test.value+'!');
      };
    } else {
      var runner = Soundex(test.words[0],(test.scale?true:false),(test.mysql?true:false))
      if (runner == test.value) {
         console.log('"'+test.words[0]+'" matches '+test.value+'! ('+(test.mysql?'MySQL':'No MySQL')+')');
       } else {
         console.log('FAILED! "'+test.words[0]+'" is "'+runner+'", should be '+test.value+'! ('+(test.mysql?'MySQL':'No MySQL')+')');
      };
    };
};
