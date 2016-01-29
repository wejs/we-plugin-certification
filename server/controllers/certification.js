module.exports = {
  userCertifications: function userCertifications(req, res, next) {
    if (!req.params.userId) return next();
    req.we.db.models.certification.findAll({
      where: { userId: req.params.userId }
    }).then(function (r){
      res.locals.data = r;
      res.ok();
    }).catch(res.queryError);
  },
  downloadAsPDF: function downloadAsPDF(req, res, next) {
    req.we.db.models.certification.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.certificationId
      },
      include: [{ model: req.we.db.models.user, as: 'user'}]
    }).then(function (r) {
      if (!r) return res.notFound();

      res.locals.data = r;

      req.we.db.models.certificationTemplate.findOne({
        where: { id: r.templateId },
      }).then(function (tpl) {

        res.locals.pdfTemplate = tpl;
        // render the template
        req.we.ṕlugins['we-plugin-certification'].renderPDFtemplate(req, res, next);
      }).catch(res.queryError);
    }).catch(res.queryError);
  }
};