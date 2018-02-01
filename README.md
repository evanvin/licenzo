# Licenzo

A real driver's license identification generator. For now, it is only for Maryland, but it is structured to be scalable to other states.

<p align="center">
  <a href="https://www.npmjs.com/package/licenzo">
    <img src="https://badge.fury.io/js/licenzo.svg"
         alt="NPM">
  </a>
</p>

## Demo

[Demo](https://rawgit.com/evanvin/licenzo/master/examples/browser/index.html)


## Usage

### Node.js
```javascript
var licenzo = require('licenzo');

var billNye = licenzo.md.generate("William", "Sanford", "Nye", "11", "27");
console.log(billNye);		//N-000-887-758-906 (MD Driver's License #)

var kateHudson = licenzo.md.generate("Kate", "Garry", "Hudson", "4", "19");
console.log(kateHudson);	//H-325-461-271-303 (MD Driver's License #)

var santaClaus = licenzo.md.generate("Santa", "", Claus", "3", "15");
console.log(santaClaus);	//C-420-758-014-197 (MD Driver's License #)


var name = licenzo.{state abbreviation}.generate({params}); //format
```


### Testing
	
	npm test


## Current State Support

- Maryland 
  - (*firstName*, *middleName*, *lastName*, *dobMonth*, *dobDay*)
- Washington
  - (*firstName*, *middleName*, *lastName*, *dobMonth*, *dobDay*, *dobYear*)

## Credits

This software uses code from several open source packages.

- [Node.js](https://nodejs.org/)
- [soundex](https://www.npmjs.com/package/soundex) - helper for indexing names by sound using a phonetic algorithm



## Maintainer

> [evan.vin](http://www.evan.vin) &nbsp;&middot;&nbsp;
> GitHub [@evanvin](https://github.com/evanvin) &nbsp;&middot;&nbsp;
