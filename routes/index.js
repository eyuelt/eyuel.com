exports.index = function(req, res) {
  res.render('index');
};

exports.homepage = function(req, res) {
  res.render('homepage');
};

exports.notfound = function(req, res) {
  res.render('404');
};
