var util = require('util'),
cloud = require('./lib/cloudapp');

var types = ['all', 'image', 'bookmark', 'text', 'archive', 'audio', 'video', 'unknown'];

process.argv.shift();
process.argv.shift();

cloud.setCredentials(process.argv.shift(), process.argv.shift());

switch (process.argv[0]) {
  case 'list':
    var params = {'page': Number(process.argv[1]) || 1,
                  'per_page': Number(process.argv[2]) || 10,
                  'type': types.indexOf(process.argv[3]) != -1 ? process.argv[3] : 'all',
                  'deleted': process.argv[4] == 'true' ? 'true' : 'false'};
    if (params.type == 'all') {
      delete params.type;
    }
    cloud.getItems(params, console.log);
  break;
  case 'push':
    cloud.addFile(process.argv[1], console.log);
  break;
  case 'bookmark':
    cloud.getInfos(process.argv[1], console.log, process.argv[2]);
  break;
  case 'info':
    cloud.getInfos(process.argv[1], console.log);
  break;
  case 'help':
    switch (process.argv[1]) {
      case 'list':
        util.puts('list your files');
        util.puts('params :');
        util.puts('  - page (1) : page number starting at 1');
        util.puts('  - limit (10) : define the number of item per page');
        util.puts('  - type (all) : type of file (all, image, bookmark,');
        util.puts('                 text, archive, audio, video, or unknown)');
        util.puts('  - deleted (true) : show deleted items');
      break;
      case 'push':
        util.puts('upload file named filename');
        util.puts('params :');
        util.puts('  - filename : relative file name');
      break;
      case 'info':

      break;
      case 'bookmark':
        util.puts('save defined bookmark');
        util.puts('params :');
        util.puts('  - link : bookmark\'s url');
        util.puts('  - name (link) : name, ie: website name');
      break;
      case 'info':
        util.puts('display informations about one of your files');
        util.puts('params :');
        util.puts('  - slug : file\'s unique id');
      break;
    }
  default:
    util.puts('usage : node app.js username password action [options]...');
    util.puts('actions :');
    util.puts('  - list [page] [limit] [type] [deleted] : list your files');
    util.puts('  - push filename : upload a file');
    util.puts('  - bookmark link [name] : save a bookmark');
    util.puts('  - info slug : retrieve some information about a file');
    util.puts('  - help command : display some help about the command');
}
