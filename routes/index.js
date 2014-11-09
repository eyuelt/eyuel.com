exports.homepage = function(req, res) {
  res.render('homepage');
};

exports.notfound = function(req, res) {
  res.render('404');
};
