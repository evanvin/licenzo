/**
 *
 * @namespace licenzo.wi
 */
 var WI = function (licenzo) {
  var self = this;
  /**
   * generate
   *
   * @method licenzo.wi.generate
   */
   self.generate = function (fn, mn, ln, dobM, dobD, dobY, s) {

    try{
      //the "-00" is overflow number in case someone else has the same info as you.
      //So I just put 00 instead of randomly generating a number.
      return part_one(ln) + part_two(fn, mn) + part_three(dobY) + part_four(dobM,dobD, s) + "-00";  
    }catch(e){
      console.log(e);
    }
    return "Error Occured";

  };

};

const soundex = require('../../soundex.js');
const info = require('./wi.json');

function part_one(ln){
  if(ln){
    return soundex(ln);
  }
  else{
    throw new Error("Last name must be input.");
  }  
}

function part_two(fn, mn){
  if(fn){
    fn = fn.charAt(0).toUpperCase() + fn.toLowerCase().slice(1);
    var pt = ( info["firstName"][fn] || info["firstInitial"][fn.charCodeAt(0)-65] ) + middleInitial(mn);
    return "-" + ("" + pt).padStart(3, "0");
  }
  else{
    throw new Error("First name must be input.")
  }
}

function part_three(dobY){
  if(!isNaN(dobY)){
    if(dobY.length === 4){
      var year = dobY.slice(-2);
      return (year.charAt(0) + "-" + year.charAt(1));
    }
    else{
      throw new Error("Year must be of length 4 and in YYYY format.");
    }
  }
  else{
    throw new Error("Year must be a number.");
  }
}


function part_four(dobM, dobD, s){
  if(!isNaN(dobM)){
    var m = Number(dobM);
    if(m > 0 && m < 13){
      if(!isNaN(dobD)){
        var d = Number(dobD);
        if(d > 0 && d < 32){
          if(s !== undefined){
            var sn = s === 'F' ? 500 : 0;
            return ("" + ( ( (m-1) * 40 ) + d + sn) ).padStart(3,"0");
          }
          else{
            throw new Error("Sex must be F or M.")
          }
        }
        else{
          throw new Error("Date must be between 0 and 32.");
        }
      }
      else{
        throw new Error("Date must be a number.");
      }
    }
    else{
      throw new Error("Month must be between 0 and 13.");
    }
  }
  else{
    throw new Error("Month must be a number.");
  }
}


function middleInitial(mn){
  mn = mn.toUpperCase();
  var n = mn.charCodeAt(0) || 0;
  switch(n){
    case 0: return 0;
    case 82: return 16;
    case 83: return 17;
    default:
    if(n > 86) return 19;
    if(n > 83) return 18;
    if(n > 79) return 15;
    if(n > 77) return 14;
    return n - 64;
  }
}

module["exports"] = WI;
