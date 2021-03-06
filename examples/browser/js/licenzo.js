(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.licenzo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Licenzo = require('./lib');
var licenzo = new Licenzo();
module['exports'] = licenzo;
},{"./lib":2}],2:[function(require,module,exports){
/**
 *
 * @namespace licenzo
 */
 function Licenzo () {

  var self = this;


  function bindAll(obj) {
    Object.keys(obj).forEach(function(meth) {
      if (typeof obj[meth] === 'function') {
        obj[meth] = obj[meth].bind(obj);
      }
    });
    return obj;
  }

  //Maryland
  var MD = require('./states/MD/md');
  self.md = bindAll(new MD(self));

  //Washington
  var WA = require('./states/WA/wa');
  self.wa = bindAll(new WA(self));

  //Florida
  var FL = require('./states/FL/fl');
  self.fl = bindAll(new FL(self));

  //Wisconsin
  var WI = require('./states/WI/wi');
  self.wi = bindAll(new WI(self));


};

module['exports'] = Licenzo;

},{"./states/FL/fl":5,"./states/MD/md":7,"./states/WA/wa":8,"./states/WI/wi":10}],3:[function(require,module,exports){
module.exports = function (s) {
    var a = s.toLowerCase().split(''),
    f = a.shift(),
    r = '',
    codes = {
       a: '', e: '', i: '', o: '', u: '',
       b: 1, f: 1, p: 1, v: 1,
       c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
       d: 3, t: 3,
       l: 4,
       m: 5, n: 5,
       r: 6
   };

   r = f +
   a
   .map(function (v, i, a) { return codes[v] })
   .filter(function (v, i, a) {
       return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
   })
   .join('');

   return (r + '000').slice(0, 4).toUpperCase();
};
},{}],4:[function(require,module,exports){
module.exports={ 
	"firstName" : {"Albert" : 20, "Alice" : 20, "Ann" : 40, "Anna" : 40, "Anne" : 40, "Annie" : 40, "Arthur" : 40, "Bernard" : 80, "Bette" : 80, "Bettie" : 80, "Betty" : 80, "Carl" : 120, "Catherine" : 120, "Charles" : 140, "Dorthy" : 180, "Edward" : 220, "Elizabeth" : 220, "Florence" : 260, "Donald" : 180, "Clara" : 140, "Frank" : 260, "George" : 300, "Grace" : 300, "Harold" : 340, "Harriet" : 340, "Harry" : 360, "Hazel" : 360, "Helen" : 380, "Henry" : 380, "James" : 440, "Jane" : 440, "Jayne" : 440, "Jean" : 460, "Joan" : 480, "John" : 460, "Joseph" : 480, "Margaret" : 560, "Martin" : 560, "Marvin" : 580, "Mary" : 580, "Melvin" : 600, "Mildred" : 600, "Patricia" : 680, "Paul" : 680, "Richard" : 740, "Robert" : 760, "Ruby" : 740, "Ruth" : 760, "Thelma" : 820, "Thomas" : 820, "Walter" : 900, "Wanda" : 900, "William" : 920, "Wilma" : 920 },
	"firstInitial" : [0,60,100,160,200,240,280,320,400,420,500,520,540,620,640,660,700,720,780,800,840,860,880,940,960,980]
}
},{}],5:[function(require,module,exports){
/**
 *
 * @namespace licenzo.fl
 */
 var FL = function (licenzo) {
  var self = this;
  /**
   * generate
   *
   * @method licenzo.fl.generate
   */
   self.generate = function (fn, mn, ln, dobM, dobD, dobY, s) {

    try{
      //the "-0" is overflow number in case someone else has the same info as you.
      //So I just put 0 instead of randomly generating a number.
      return part_one(ln) + part_two(fn, mn) + part_three(dobY) + part_four(dobM,dobD, s) + "-0";  
    }catch(e){
      console.log(e);
    }
    return "Error Occured";

  };

};

const soundex = require('../../soundex.js');
const info = require('./fl.json');

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
      return "-" + dobY.slice(-2);
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
            return "-" + ("" + ( ( (m-1) * 40 ) + d + sn) ).padStart(3,"0");
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

module["exports"] = FL;

},{"../../soundex.js":3,"./fl.json":4}],6:[function(require,module,exports){
module.exports={ "firstName" : {"a":"027", "aa":"028", "ab":"029", "ac":"030", "ad":"031", "ae":"032", "af":"033", "ag":"034", "ah":"035", "ai":"036", "aj":"037", "ak":"038", "al":"039", "ala":"040", "alb":"041", "alc":"042", "ald":"043", "ale":"044", "alf":"045", "alg":"046", "alh":"047", "ali":"048", "alj":"049", "alk":"050", "all":"051", "alm":"052", "aln":"053", "alo":"054", "alp":"055", "alq":"056", "alr":"057", "als":"058", "alt":"059", "alu":"060", "alv":"061", "alw":"062", "alx":"063", "aly":"064", "alz":"065", "am":"066", "an":"067", "ao":"068", "ap":"069", "aq":"070", "ar":"071", "as":"072", "at":"073", "au":"074", "av":"075", "aw":"076", "ax":"077", "ay":"078", "az":"079", "b":"080", "ba":"081", "bb":"082", "bc":"083", "bd":"084", "be":"085", "bf":"086", "bg":"087", "bh":"088", "bi":"089", "bj":"090", "bk":"091", "bl":"092", "bm":"093", "bn":"094", "bo":"095", "bp":"096", "bq":"097", "br":"098", "bs":"099", "bt":"100", "bu":"101", "bv":"102", "bw":"103", "bx":"104", "by":"105", "bz":"106", "c":"107", "ca":"108", "cb":"109", "cc":"110", "cd":"111", "ce":"112", "cf":"113", "cg":"114", "ch":"115", "ci":"116", "cj":"117", "ck":"118", "cl":"119", "cm":"120", "cn":"121", "co":"122", "cp":"123", "cq":"124", "cr":"125", "cs":"126", "ct":"127", "cu":"128", "cv":"129", "cw":"130", "cx":"131", "cy":"132", "cz":"133", "d":"134", "da":"135", "db":"136", "dc":"137", "dd":"138", "de":"139", "df":"140", "dg":"141", "dh":"142", "di":"143", "dj":"144", "dk":"145", "dl":"146", "dm":"147", "dn":"148", "do":"149", "dp":"150", "dq":"151", "dr":"152", "ds":"153", "dt":"154", "du":"155", "dv":"156", "dw":"157", "dx":"158", "dy":"159", "dz":"160", "e":"161", "ea":"162", "eb":"163", "ec":"164", "ed":"165", "eda":"166", "edb":"167", "edc":"168", "edd":"169", "ede":"170", "edf":"171", "edg":"172", "edh":"173", "edi":"174", "edj":"175", "edk":"176", "edl":"177", "edm":"178", "edn":"179", "edo":"180", "edp":"181", "edq":"182", "edr":"183", "eds":"184", "edt":"185", "edu":"186", "edv":"187", "edw":"188", "edward":"189", "edx":"190", "edy":"191", "edz":"192", "ee":"193", "ef":"194", "eg":"195", "eh":"196", "ei":"197", "ej":"198", "ek":"199", "el":"200", "ela":"201", "elb":"202", "elc":"203", "eld":"204", "ele":"205", "elf":"206", "elg":"207", "elh":"208", "eli":"209", "elizabeth":"210", "elj":"211", "elk":"212", "ell":"213", "ellen":"214", "elm":"215", "eln":"216", "elo":"217", "elp":"218", "elq":"219", "elr":"220", "els":"221", "elt":"222", "elu":"223", "elv":"224", "elw":"225", "elx":"226", "ely":"227", "elz":"228", "em":"229", "en":"230", "eo":"231", "ep":"232", "eq":"233", "er":"234", "es":"235", "et":"236", "eu":"237", "ev":"238", "ew":"239", "ex":"240", "ey":"241", "ez":"242", "f":"243", "fa":"244", "fb":"245", "fc":"246", "fd":"247", "fe":"248", "ff":"249", "fg":"250", "fh":"251", "fi":"252", "fj":"253", "fk":"254", "fl":"255", "fm":"256", "fn":"257", "fo":"258", "fp":"259", "fq":"260", "fr":"261", "fs":"262", "ft":"263", "fu":"264", "fv":"265", "fw":"266", "fx":"267", "fy":"268", "fz":"269", "g":"270", "ga":"271", "gb":"272", "gc":"273", "gd":"274", "ge":"275", "gf":"276", "gg":"277", "gh":"278", "gi":"279", "gj":"280", "gk":"281", "gl":"282", "gm":"283", "gn":"284", "go":"285", "gp":"286", "gq":"287", "gr":"288", "gs":"289", "gt":"290", "gu":"291", "gv":"292", "gw":"293", "gx":"294", "gy":"295", "gz":"296", "h":"297", "ha":"298", "hb":"299", "hc":"300", "hd":"301", "he":"302", "henry":"303", "hf":"304", "hg":"305", "hh":"306", "hi":"307", "hj":"308", "hk":"309", "hl":"310", "hm":"311", "hn":"312", "ho":"313", "hp":"314", "hq":"315", "hr":"316", "hs":"317", "ht":"318", "hu":"319", "hv":"320", "hw":"321", "hx":"322", "hy":"323", "hz":"324", "i":"325", "ia":"326", "ib":"327", "ic":"328", "id":"329", "ie":"330", "if":"331", "ig":"332", "ih":"333", "ii":"334", "ij":"335", "ik":"336", "il":"337", "im":"338", "in":"339", "io":"340", "ip":"341", "iq":"342", "ir":"343", "is":"344", "it":"345", "iu":"346", "iv":"347", "iw":"348", "ix":"349", "iy":"350", "iz":"351", "j":"352", "ja":"353", "jaa":"354", "jab":"355", "jac":"356", "jad":"357", "jae":"358", "jaf":"359", "jag":"360", "jah":"361", "jai":"362", "jaj":"363", "jak":"364", "jal":"365", "jam":"366", "james":"367", "jan":"368", "jao":"369", "jap":"370", "jaq":"371", "jar":"372", "jas":"373", "jat":"374", "jau":"375", "jav":"376", "jaw":"377", "jax":"378", "jay":"379", "jaz":"380", "jb":"381", "jc":"382", "jd":"383", "je":"384", "jea":"385", "jeb":"386", "jec":"387", "jed":"388", "jee":"389", "jef":"390", "jeg":"391", "jeh":"392", "jei":"393", "jej":"394", "jek":"395", "jel":"396", "jem":"397", "jen":"398", "jeo":"399", "jep":"400", "jeq":"401", "jer":"402", "jes":"403", "jet":"404", "jeu":"405", "jev":"406", "jew":"407", "jex":"408", "jey":"409", "jez":"410", "jf":"411", "jg":"412", "jh":"413", "ji":"414", "jj":"415", "jk":"416", "jl":"417", "jm":"418", "jn":"419", "jo":"420", "joa":"421", "job":"422", "joc":"423", "jod":"424", "joe":"425", "jof":"426", "jog":"427", "joh":"428", "john":"429", "joi":"430", "joj":"431", "jok":"432", "jol":"433", "jom":"434", "jon":"435", "joo":"436", "jop":"437", "joq":"438", "jor":"439", "jos":"440", "joseph":"441", "jot":"442", "jou":"443", "jov":"444", "jow":"445", "jox":"446", "joy":"447", "joz":"448", "jp":"449", "jq":"450", "jr":"451", "js":"452", "jt":"453", "ju":"454", "jv":"455", "jw":"456", "jx":"457", "jy":"458", "jz":"459", "k":"460", "ka":"461", "kb":"462", "kc":"463", "kd":"464", "ke":"465", "kf":"466", "kg":"467", "kh":"468", "ki":"469", "kj":"470", "kk":"471", "kl":"472", "km":"473", "kn":"474", "ko":"475", "kp":"476", "kq":"477", "kr":"478", "ks":"479", "kt":"480", "ku":"481", "kv":"482", "kw":"483", "kx":"484", "ky":"485", "kz":"486", "l":"487", "la":"488", "lb":"489", "lc":"490", "ld":"491", "le":"492", "lea":"493", "leb":"494", "lec":"495", "led":"496", "lee":"497", "lef":"498", "leg":"499", "leh":"500", "lei":"501", "lej":"502", "lek":"503", "lel":"504", "lem":"505", "len":"506", "leo":"507", "lep":"508", "leq":"509", "ler":"510", "les":"511", "let":"512", "leu":"513", "lev":"514", "lew":"515", "lex":"516", "ley":"517", "lez":"518", "lf":"519", "lg":"520", "lh":"521", "li":"522", "lj":"523", "lk":"524", "ll":"525", "lm":"526", "ln":"527", "lo":"528", "loa":"529", "lob":"530", "loc":"531", "lod":"532", "loe":"533", "lof":"534", "log":"535", "loh":"536", "loi":"537", "loj":"538", "lok":"539", "lol":"540", "lom":"541", "lon":"542", "loo":"543", "lop":"544", "loq":"545", "lor":"546", "los":"547", "lot":"548", "lou":"549", "lov":"550", "low":"551", "lox":"552", "loy":"553", "loz":"554", "lp":"555", "lq":"556", "lr":"557", "ls":"558", "lt":"559", "lu":"560", "lv":"561", "lw":"562", "lx":"563", "ly":"564", "lz":"565", "m":"566", "ma":"567", "maa":"568", "mab":"569", "mac":"570", "mad":"571", "mae":"572", "maf":"573", "mag":"574", "mah":"575", "mai":"576", "maj":"577", "mak":"578", "mal":"579", "mam":"580", "man":"581", "mao":"582", "map":"583", "maq":"584", "mar":"585", "margaret":"586", "mary":"587", "mas":"588", "mat":"589", "mau":"590", "mav":"591", "maw":"592", "max":"593", "may":"594", "maz":"595", "mb":"596", "mc":"597", "md":"598", "me":"599", "mf":"600", "mg":"601", "mh":"602", "mi":"603", "mj":"604", "mk":"605", "ml":"606", "mm":"607", "mn":"608", "mo":"609", "mp":"610", "mq":"611", "mr":"612", "ms":"613", "mt":"614", "mu":"615", "mv":"616", "mw":"617", "mx":"618", "my":"619", "mz":"620", "n":"621", "na":"622", "nb":"623", "nc":"624", "nd":"625", "ne":"626", "nf":"627", "ng":"628", "nh":"629", "ni":"630", "nj":"631", "nk":"632", "nl":"633", "nm":"634", "nn":"635", "no":"636", "np":"637", "nq":"638", "nr":"639", "ns":"640", "nt":"641", "nu":"642", "nv":"643", "nw":"644", "nx":"645", "ny":"646", "nz":"647", "o":"648", "oa":"649", "ob":"650", "oc":"651", "od":"652", "oe":"653", "of":"654", "og":"655", "oh":"656", "oi":"657", "oj":"658", "ok":"659", "ol":"660", "om":"661", "on":"662", "oo":"663", "op":"664", "oq":"665", "or":"666", "os":"667", "ot":"668", "ou":"669", "ov":"670", "ow":"671", "ox":"672", "oy":"673", "oz":"674", "p":"675", "pa":"676", "pb":"677", "pc":"678", "pd":"679", "pe":"680", "pf":"681", "pg":"682", "ph":"683", "pi":"684", "pj":"685", "pk":"686", "pl":"687", "pm":"688", "pn":"689", "po":"690", "pp":"691", "pq":"692", "pr":"693", "ps":"694", "pt":"695", "pu":"696", "pv":"697", "pw":"698", "px":"699", "py":"700", "pz":"701", "q":"702", "qa":"703", "qb":"704", "qc":"705", "qd":"706", "qe":"707", "qf":"708", "qg":"709", "qh":"710", "qi":"711", "qj":"712", "qk":"713", "ql":"714", "qm":"715", "qn":"716", "qo":"717", "qp":"718", "qq":"719", "qr":"720", "qs":"721", "qt":"722", "qu":"723", "qv":"724", "qw":"725", "qx":"726", "qy":"727", "qz":"728", "r":"729", "ra":"730", "rb":"731", "rc":"732", "rd":"733", "re":"734", "rf":"735", "rg":"736", "rh":"737", "ri":"738", "rj":"739", "rk":"740", "rl":"741", "rm":"742", "rn":"743", "ro":"744", "robert":"745", "rp":"746", "rq":"747", "rr":"748", "rs":"749", "rt":"750", "ru":"751", "rv":"752", "rw":"753", "rx":"754", "ry":"755", "rz":"756", "s":"757", "sa":"758", "sb":"759", "sc":"760", "sd":"761", "se":"762", "sf":"763", "sg":"764", "sh":"765", "si":"766", "sj":"767", "sk":"768", "sl":"769", "sm":"770", "sn":"771", "so":"772", "sp":"773", "sq":"774", "sr":"775", "ss":"776", "st":"777", "su":"778", "sv":"779", "sw":"780", "sx":"781", "sy":"782", "sz":"783", "t":"784", "ta":"785", "tb":"786", "tc":"787", "td":"788", "te":"789", "tf":"790", "tg":"791", "th":"792", "ti":"793", "tj":"794", "tk":"795", "tl":"796", "tm":"797", "tn":"798", "to":"799", "tp":"800", "tq":"801", "tr":"802", "ts":"803", "tt":"804", "tu":"805", "tv":"806", "tw":"807", "tx":"808", "ty":"809", "tz":"810", "u":"811", "ua":"812", "ub":"813", "uc":"814", "ud":"815", "ue":"816", "uf":"817", "ug":"818", "uh":"819", "ui":"820", "uj":"821", "uk":"822", "ul":"823", "um":"824", "un":"825", "uo":"826", "up":"827", "uq":"828", "ur":"829", "us":"830", "ut":"831", "uu":"832", "uv":"833", "uw":"834", "ux":"835", "uy":"836", "uz":"837", "v":"838", "va":"839", "vb":"840", "vc":"841", "vd":"842", "ve":"843", "vf":"844", "vg":"845", "vh":"846", "vi":"847", "vj":"848", "vk":"849", "vl":"850", "vm":"851", "vn":"852", "vo":"853", "vp":"854", "vq":"855", "vr":"856", "vs":"857", "vt":"858", "vu":"859", "vv":"860", "vw":"861", "vx":"862", "vy":"863", "vz":"864", "w":"865", "wa":"866", "wb":"867", "wc":"868", "wd":"869", "we":"870", "wf":"871", "wg":"872", "wh":"873", "wi":"874", "wia":"875", "wib":"876", "wic":"877", "wid":"878", "wie":"879", "wif":"880", "wig":"881", "wih":"882", "wii":"883", "wij":"884", "wik":"885", "wil":"886", "william":"887", "wim":"888", "win":"889", "wio":"890", "wip":"891", "wiq":"892", "wir":"893", "wis":"894", "wit":"895", "wiu":"896", "wiv":"897", "wiw":"898", "wix":"899", "wiy":"900", "wiz":"901", "wj":"902", "wk":"903", "wl":"904", "wm":"905", "wn":"906", "wo":"907", "wp":"908", "wq":"909", "wr":"910", "ws":"911", "wt":"912", "wu":"913", "wv":"914", "ww":"915", "wx":"916", "wy":"917", "wz":"918", "x":"919", "xa":"920", "xb":"921", "xc":"922", "xd":"923", "xe":"924", "xf":"925", "xg":"926", "xh":"927", "xi":"928", "xj":"929", "xk":"930", "xl":"931", "xm":"932", "xn":"933", "xo":"934", "xp":"935", "xq":"936", "xr":"937", "xs":"938", "xt":"939", "xu":"940", "xv":"941", "xw":"942", "xx":"943", "xy":"944", "xz":"945", "y":"946", "ya":"947", "yb":"948", "yc":"949", "yd":"950", "ye":"951", "yf":"952", "yg":"953", "yh":"954", "yi":"955", "yj":"956", "yk":"957", "yl":"958", "ym":"959", "yn":"960", "yo":"961", "yp":"962", "yq":"963", "yr":"964", "ys":"965", "yt":"966", "yu":"967", "yv":"968", "yw":"969", "yx":"970", "yy":"971", "yz":"972", "z":"973", "za":"974", "zb":"975", "zc":"976", "zd":"977", "ze":"978", "zf":"979", "zg":"980", "zh":"981", "zi":"982", "zj":"983", "zk":"984", "zl":"985", "zm":"986", "zn":"987", "zo":"988", "zp":"989", "zq":"990", "zr":"991", "zs":"992", "zt":"993", "zu":"994", "zv":"995", "zw":"996", "zx":"997", "zy":"998", "zz":"999"},
"middleSpecial" : {"a" : "001", "b" : "002", "c" : "003", "d" : "004", "e" : "005", "f" : "006", "g" : "007", "h" : "008", "i" : "009", "j" : "010", "k" : "011", "l" : "012", "m" : "013", "n" : "014", "o" : "015", "p" : "016", "q" : "017", "r" : "018", "s" : "019", "t" : "020", "u" : "021", "v" : "022", "w" : "023", "x" : "024", "y" : "025", "z" : "026"},
"dob" : { "1" : {"1" : "002", "2" : "007", "3" : "010", "4" : "012", "5" : "017", "6" : "020", "7" : "022", "8" : "025", "9" : "027", "10" : "030", "11" : "032", "12" : "035", "13" : "037", "14" : "040", "15" : "042", "16" : "045", "17" : "047", "18" : "050", "19" : "052", "20" : "055", "21" : "057", "22" : "060", "23" : "062", "24" : "065", "25" : "067", "26" : "070", "27" : "072", "28" : "075", "29" : "077", "30" : "080", "31" : "082" }, "2" : {"1" : "086", "2" : "088", "3" : "091", "4" : "093", "5" : "096", "6" : "098", "7" : "101", "8" : "103", "9" : "106", "10" : "108", "11" : "111", "12" : "113", "13" : "116", "14" : "118", "15" : "121", "16" : "123", "17" : "126", "18" : "128", "19" : "131", "20" : "133", "21" : "136", "22" : "138", "23" : "141", "24" : "143", "25" : "146", "26" : "148", "27" : "151", "28" : "153", "29" : "156" }, "3" : {"1" : "159", "2" : "162", "3" : "164", "4" : "167", "5" : "169", "6" : "172", "7" : "174", "8" : "177", "9" : "182", "10" : "184", "11" : "187", "12" : "189", "13" : "192", "14" : "194", "15" : "197", "16" : "199", "17" : "202", "18" : "204", "19" : "207", "20" : "227", "21" : "229", "22" : "232", "23" : "234", "24" : "237", "25" : "239", "26" : "242", "27" : "244", "28" : "247", "29" : "249", "30" : "252", "31" : "254" }, "4" : {"1" : "258", "2" : "260", "3" : "263", "4" : "265", "5" : "268", "6" : "270", "7" : "273", "8" : "275", "9" : "278", "10" : "280", "11" : "283", "12" : "285", "13" : "288", "14" : "290", "15" : "293", "16" : "295", "17" : "298", "18" : "300", "19" : "303", "20" : "305", "21" : "308", "22" : "310", "23" : "313", "24" : "315", "25" : "318", "26" : "320", "27" : "323", "28" : "325", "29" : "328", "30" : "330" }, "5" : {"1" : "334", "2" : "336", "3" : "339", "4" : "341", "5" : "344", "6" : "346", "7" : "349", "8" : "351", "9" : "354", "10" : "356", "11" : "359", "12" : "361", "13" : "364", "14" : "366", "15" : "369", "16" : "371", "17" : "374", "18" : "376", "19" : "379", "20" : "381", "21" : "384", "22" : "386", "23" : "389", "24" : "391", "25" : "394", "26" : "396", "27" : "399", "28" : "401", "29" : "404", "30" : "406", "31" : "409" }, "6" : {"1" : "412", "2" : "415", "3" : "417", "4" : "420", "5" : "422", "6" : "425", "7" : "427", "8" : "430", "9" : "432", "10" : "435", "11" : "437", "12" : "440", "13" : "442", "14" : "445", "15" : "447", "16" : "450", "17" : "452", "18" : "467", "19" : "470", "20" : "472", "21" : "475", "22" : "477", "23" : "480", "24" : "482", "25" : "497", "26" : "500", "27" : "502", "28" : "505", "29" : "507", "30" : "517" }, "7" : {"1" : "521", "2" : "523", "3" : "526", "4" : "528", "5" : "534", "6" : "537", "7" : "539", "8" : "542", "9" : "544", "10" : "547", "11" : "549", "12" : "552", "13" : "554", "14" : "557", "15" : "559", "16" : "562", "17" : "564", "18" : "567", "19" : "569", "20" : "572", "21" : "574", "22" : "577", "23" : "579", "24" : "582", "25" : "584", "26" : "587", "27" : "589", "28" : "592", "29" : "594", "30" : "597", "31" : "599" }, "8" : {"1" : "603", "2" : "605", "3" : "608", "4" : "610", "5" : "613", "6" : "615", "7" : "618", "8" : "620", "9" : "623", "10" : "625", "11" : "628", "12" : "630", "13" : "633", "14" : "635", "15" : "638", "16" : "640", "17" : "643", "18" : "645", "19" : "648", "20" : "650", "21" : "653", "22" : "655", "23" : "658", "24" : "660", "25" : "663", "26" : "665", "27" : "668", "28" : "670", "29" : "673", "30" : "675", "31" : "678" }, "9" : {"1" : "681", "2" : "684", "3" : "686", "4" : "689", "5" : "691", "6" : "694", "7" : "696", "8" : "699", "9" : "701", "10" : "704", "11" : "706", "12" : "709", "13" : "711", "14" : "714", "15" : "716", "16" : "719", "17" : "721", "18" : "724", "19" : "726", "20" : "729", "21" : "731", "22" : "734", "23" : "736", "24" : "739", "25" : "741", "26" : "744", "27" : "746", "28" : "749", "29" : "751", "30" : "754" }, "10" : {"1" : "757", "2" : "760", "3" : "762", "4" : "765", "5" : "767", "6" : "770", "7" : "772", "8" : "775", "9" : "777", "10" : "780", "11" : "782", "12" : "785", "13" : "787", "14" : "790", "15" : "792", "16" : "797", "17" : "800", "18" : "802", "19" : "807", "20" : "810", "21" : "812", "22" : "815", "23" : "817", "24" : "820", "25" : "822", "26" : "825", "27" : "827", "28" : "830", "29" : "832", "30" : "835", "31" : "837" }, "11" : {"1" : "841", "2" : "843", "3" : "846", "4" : "848", "5" : "851", "6" : "853", "7" : "856", "8" : "858", "9" : "861", "10" : "863", "11" : "866", "12" : "868", "13" : "871", "14" : "873", "15" : "876", "16" : "878", "17" : "881", "18" : "883", "19" : "886", "20" : "888", "21" : "891", "22" : "893", "23" : "896", "24" : "898", "25" : "901", "26" : "903", "27" : "906", "28" : "908", "29" : "911", "30" : "913" }, "12" : {"1" : "917", "2" : "919", "3" : "922", "4" : "924", "5" : "927", "6" : "929", "7" : "932", "8" : "934", "9" : "937", "10" : "939", "11" : "942", "12" : "944", "13" : "947", "14" : "949", "15" : "952", "16" : "954", "17" : "957", "18" : "959", "19" : "962", "20" : "964", "21" : "967", "22" : "969", "23" : "972", "24" : "974", "25" : "977", "26" : "983", "27" : "985", "28" : "990", "29" : "993", "30" : "995", "31" : "998" } } }
},{}],7:[function(require,module,exports){
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

const soundex = require('../../soundex.js');
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

function part_three(mn){
  if(mn == ""){
    if(noMiddleName.fullyCoded){
      return "-000";
    }
    else{
      return "-" + info["middleSpecial"][noMiddleName.firstUnusedChar];
    }
  }
  else{
    return part_two(mn);
  }
}


function part_four(dobM, dobD){
  return "-" + info["dob"][dobM][dobD];
}

module["exports"] = MD;

},{"../../soundex.js":3,"./md.json":6}],8:[function(require,module,exports){
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
      throw new Error("Date must be between 0 and 32.");
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

},{}],9:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],10:[function(require,module,exports){
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

},{"../../soundex.js":3,"./wi.json":9}]},{},[1])(1)
});