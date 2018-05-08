module.exports = {
  userCertifications(req, res, next) {
    if (!req.params.userId) return next();
    req.we.db.models.certification
    .findAll({
      where: { userId: req.params.userId }
    })
    .then( (r)=> {
      res.locals.data = r;
      res.ok();
      return null;
    })
    .catch(res.queryError);
  },
  downloadAsPDF(req, res, next) {
    req.we.db.models.certification
    .findOne({
      where: {
        userId: req.params.userId,
        id: req.params.certificationId
      },
      include: [{
        model: req.we.db.models.user, as: 'user'
      }]
    })
    .then( (r)=> {
      if (!r) return res.notFound();

      res.locals.data = r;

      return req.we.db.models.certificationTemplate
      .findOne({
        where: { id: r.templateId },
      })
      .then( (tpl)=> {
        res.locals.pdfTemplate = tpl;
        // render the template
        req.we.plugins['we-plugin-certification'].renderPDFtemplate(req, res, next);
        return null;
      });
    })
    .catch(res.queryError);
  }
};