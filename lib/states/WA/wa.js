/**
 *
 * @namespace licenzo.wa
 */
 var WA = function (licenzo) {
  var self = this;
  /**
   * generate
   *
   * @method licenzo.wa.generate
   */
   self.generate = function (fn, mn, ln, dobM, dobD, dobY) {

    try{
      var checks = [];
      checks = checks.concat(part_one(ln));
      checks = checks.concat(part_two(fn));
      checks = checks.concat(part_three(mn));
      checks = checks.concat(part_four(dobY));
      checks.push(part_five(dobM));
      checks.push(part_six(dobD));
      var c = checks.join('');
      return c.slice(0,9) + part_seven(checks) + c.slice(9);
    } catch(e){
      console.log(e);
    }
    return "Error Occured";
  };

};



function part_one(ln){
  return upperPadSplit(ln, 5).slice(0, 5);
}

function part_two(fn){
  return upperPadSplit(fn, 1)[0];
}

function part_three(mn){
  return upperPadSplit(mn, 1)[0];
}

function part_four(dobY){
  if(!isNaN(dobY)){
    if(dobY.length === 4){
      var end  = 100-Number(dobY.slice(-2));
      return (""+(end < 10 ? ("0" + end) : end)).split('');
    }
    else{
      throw new Error("Year must be of length 4 and in YYYY format.");
    }
  }
  else{
    throw new Error("Year must be a number.");
  }
}

function part_five(dobM){
  if(!isNaN(dobM)){
    var n = Number(dobM);
    if(n > 0 && n < 13){
      n = (65 + n) + (n > 3 ? 5 : 0);
      return String.fromCharCode(n);
    }
    else{
      throw new Error("Month must be between 0 and 13.");
    }
  }
  else{
    throw new Error("Month must be a number.");
  }
}

function part_six(dobD){
  if(!isNaN(dobD)){
    var n = Number(dobD);
    if(n > 0 && n < 32){
      switch(n){
        case 9: return 'Z';
        case 10: return 'S';
        case 16: return 'W';
        case 26: return '2';
        case 30: return 'T';
        case 31: return 'U';
        default:
        if(n > 19){
          return '' + (n%10);
        }
        if(n > 8){
          n-=1;
        }
        return String.fromCharCode(65+n-1);
      }
    }
    else{
      throw new Error("Date must be between 0 and 32.")
    }
  }
  else{
    throw new Error("Date must be a number.");
  }
}

function part_seven(checks){
  var c = 0;
  for(var i = 0; i < checks.length; i++){
    var v = checksumValue(checks[i]);
    c += i%2 == 1 ? (0-v) : v;
  }
  return Math.abs(c%10);
}

function checksumValue(l){
  var n = l.charCodeAt(0);
  var cs = n === 42 ? 4 : (n - 65) + (n > 82 ? 4 : (n > 73 ? 2 : 1) );
  return cs%10;
}

function upperPadSplit(str, n){
  return str.toUpperCase()
  .padEnd(n, '*')
  .split('');
}

module["exports"] = WA;
