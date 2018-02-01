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

    var licenzo = require('licenzo');

    var BillNye = licenzo.md.generate("William", "Nye", "Sanford", "11", "27"); //N-000-887-758-906 (MD Driver's License #)
    var KateHudson = licenzo.md.generate("Kate", "Hudson", "Garry", "4", "19"); //H-325-461-271-303 (MD Driver's License #)
    var SantaClaus = licenzo.md.generate("Santa", "Claus", "", "3", "15"); //C-420-758-014-197 (MD Driver's License #)


### Run The Test
	
	npm test


## Credits

This software uses code from several open source packages.

- [Node.js](https://nodejs.org/)
- [soundex](https://www.npmjs.com/package/soundex) - helper for indexing names by sound using a phonetic algorithm



## Maintainer

> [evan.vin](http://www.evan.vin) &nbsp;&middot;&nbsp;
> GitHub [@evanvin](https://github.com/evanvin) &nbsp;&middot;&nbsp;
