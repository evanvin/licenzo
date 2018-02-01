var test = require('tape');
var licenzo = require('../index.js');

test('MARYLAND', function (t) {
	t.deepEqual('N-000-887-758-906', licenzo.md.generate("William", "Nye", "Sanford", "11", "27"));
	t.end();
});