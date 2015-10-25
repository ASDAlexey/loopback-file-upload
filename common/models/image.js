var lb = require('loopback');
var storage = require('loopback-component-storage');
module.exports = function (Image) {
  Image.addImage = function (data, cb) {
    var storageService = storage.StorageService({provider: 'container', root: './storage'});

    storageService.upload(req, res, {container: 'container'}, function (err, data) {
      console.log('file upload');
      console.log(data); // this provides a nice object with all of the variables and data wrt the file that was uploaded
      /// ..etc
    });
    console.log('file');
    console.log(data);
    var obj = {
      src: "bbb.jpg"
    };
    lb.getModel('Image').create(obj);
    var response = data;
    cb(null, response);
  };
  Image.remoteMethod(
    'addImage',
    {
      http: {path: '/add-image', verb: 'post'},
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      returns: {arg: 'something', type: 'object'}
    }
  );
};
