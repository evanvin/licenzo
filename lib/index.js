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




};

module['exports'] = Licenzo;
