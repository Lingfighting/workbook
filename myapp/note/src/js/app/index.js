require('less/index.less');

var NoteManager = require('mod/note-m.js').NoteManager;
var Event = require('mod/event.js');
var WaterFall = require('mod/waterfall.js');

NoteManager.load();

$('.add-note').on('click', function() {
	console.log('1----------------')
  NoteManager.add();
})

Event.on('waterfall', function(){
  WaterFall.init($('#content'));
})