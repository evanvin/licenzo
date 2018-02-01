var test = require('tape');
var licenzo = require('../index.js');

test('MARYLAND', function (t) {
	t.deepEqual('N-000-887-758-906', licenzo.md.generate("William", "Sanford", "Nye", "11", "27"));
	t.end();
});

test('WASHINGTON', function (t) {
	t.deepEqual('TUREAL*488K1', licenzo.wa.generate("Lawrence", "", "Tureaud", "5", "21", "1952"));
	t.end();
});