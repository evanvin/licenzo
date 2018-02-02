var test = require('tape');
var licenzo = require('../index.js');

test('FLORIDA', function (t) {
	t.deepEqual('S536-241-15-452-0', licenzo.fl.generate("Francis", "Albert", "Sinatra", "12", "12", "1915", "M"));
	t.end();
});

test('FLORIDA with First Name from list', function (t) {
	t.deepEqual('W426-699-73-332-0', licenzo.fl.generate("Paul", "William", "Walker", "9", "12", "1973", "M"));
	t.end();
});

test('MARYLAND', function (t) {
	t.deepEqual('N-000-887-758-906', licenzo.md.generate("William", "Sanford", "Nye", "11", "27"));
	t.end();
});

test('WASHINGTON', function (t) {
	t.deepEqual('TUREAL*488K1', licenzo.wa.generate("Lawrence", "", "Tureaud", "5", "21", "1952"));
	t.end();
});