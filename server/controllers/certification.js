var PDFDocument = require('pdfkit');

module.exports = {
  userCertifications: function userCertifications(req, res, next) {
    if (!req.params.userId) return next();
    req.we.db.models.certification.findAll({
      where: { userId: req.params.userId }
    }).then(function (r){
      res.locals.record = r;
      res.ok();
    }).catch(res.queryError);
  },
  downloadAsPDF: function downloadAsPDF(req, res) {
    req.we.db.models.certification.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.certificationId
      },
      include: [{ model: req.we.db.models.user, as: 'user'}]
    }).then(function (r) {
      if (!r) return res.notFound();

      req.we.db.models.certificationTemplate.findOne({
        modelName: 'cfcertificationtype',
        modelId: r.cfregistrationtypeId
      }).then(function (tpl) {
        var textFN = req.we.hbs.compile(tpl.text, 'utf8');

        // width 842 Pixels x height 595 Pixels
        var doc = new PDFDocument({ size: [ 824, 595 ] });
        doc.pipe(res);

        var textCorsds = req.we.config.certification.textPositions[tpl.textPosition];

        if (tpl.image && tpl.image[0]) {
          var imagePath = req.we.db.models.image.getImagePath(null, tpl.image[0].name);
          doc.image(imagePath, 0, 0, { width: 824 });
        }

        doc.fontSize(24);
        doc.text(textFN({
          user: r.user
        }), textCorsds.l, textCorsds.t);

        // finalize the PDF and end the stream
        doc.end();
      }).catch(res.queryError);
    }).catch(res.queryError);
  }
};