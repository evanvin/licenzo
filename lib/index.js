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


  var MD = require('./states/MD/md');
  self.md = bindAll(new MD(self));




};

module['exports'] = Licenzo;
