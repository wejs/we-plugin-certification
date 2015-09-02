module.exports = {
  userCertifications: function(req, res, next) {
    if (!req.params.userId) return next();
    req.we.db.models.certification.findAll({
      where: { userId: req.params.userId }
    }).then(function (r){
      res.locals.record = r;
      res.ok();
    }).catch(res.queryError);
  }
};