/*
  Soundex - v0.2.1 - Node.js & Browser
  By Louis T. <louist@ltdev.im>
  https://github.com/LouisT/node-soundex/
*/
(function(Setup) {
  "use strict"
  Setup(function (str,scale,mysql) {
          var split = String(str).toUpperCase().replace(/[^A-Z]/g,'').split(''),
              map = {BFPV:1,CGJKQSXZ:2,DT:3,L:4,MN:5,R:6},
              keys = Object.keys(map).reverse();
          var build = split.map(function (letter, index, array) {
                for (var num in keys) {
                    if (keys[num].indexOf(letter) != -1) {
                       return map[keys[num]];
                    };
                };
          });
          if (mysql) {
             build = build.filter(function(key){return key;}); 
          };
          var first = build.splice(0,1)[0];
          build = build.filter(function(num, index, array) {
               return ((index===0)?num !== first:num !== array[index-1]);
          });
          var len = build.length,
              max = (scale?((max=~~((mysql?len:len*2/3.5)))>3?max:3):3);
          return split[0]+(build.join('')+(new Array(max+1).join('0'))).slice(0,max);
  });
})((typeof exports!=='undefined'?function(fn){module.exports=fn;}:function(fn){this['Soundex']=fn;}));
