/**
 *
 * @namespace licenzo.md
 */
 var MD = function (licenzo) {
  var self = this;
  /**
   * generate
   *
   * @method licenzo.md.generate
   */
   self.generate = function (fn, mn, ln, dobM, dobD) {
    var md = part_one(ln) + part_two(fn) + part_three(mn) + part_four(dobM,dobD);
    md = md.slice(0,1) + "-" + md.slice(1);
    return md;
  };

};

const soundex = require('soundex');
const info = require('./md.json');
var noMiddleName = {"fullyCoded": false, "firstUnusedChar" : -1};

function part_one(lastName){
  return soundex(lastName);
}

function part_two(fn){
  fn = fn.toLowerCase();
  var result = "";
  
  if(info["firstName"][fn]){
    result = info["firstName"][fn];
    noMiddleName.fullyCoded = true;
  }
  else{

    for(var i = 1; i < fn.length; i++){
      var sub = fn.substring(0,i);
      if(info["firstName"][sub]){
        result = info["firstName"][sub];
        if(i === fn.length-1){
          noMiddleName.fullyCoded = true;
        }
        if(i+1 < fn.length){
          noMiddleName.firstUnusedChar = fn.charAt(i);
        }
      }
    }
  }
  return "-" + result;
}

function part_three(middleName){
  if(middleName == ""){
    if(noMiddleName.fullyCoded){
      return "-000";
    }
    else{
      return "-" + info["middleSpecial"][noMiddleName.firstUnusedChar];
    }
  }
  else{
    return part_two(middleName);
  }
}


function part_four(dobMonth, dobDay){
  return "-" + info["dob"][dobMonth][dobDay];
}

module["exports"] = MD;
