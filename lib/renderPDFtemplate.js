var PDFDocument = require('pdfkit');

/**
 * TODO move this function to one pdf plugin with custom PDF response
 */

module.exports = function renderPDFtemplate(req, res) {
  var tpl = res.locals.pdfTemplate;

   // width 842 Pixels x height 595 Pixels
  var doc = new PDFDocument({ size: [
    res.locals.PDFSizeWidth || 824,
    res.locals.PDFSizeHeight || 595
  ]});

  doc.pipe(res);

  var textCorsds = req.we.config.certification.textPositions[tpl.textPosition];

  if (tpl.image && tpl.image[0]) {
    var imagePath = req.we.db.models.image.getImagePath(null, tpl.image[0].name);
    doc.image(imagePath, 0, 0, { width: 824 });
  }

  doc.fontSize(24);
  doc.text(res.locals.data.text, textCorsds.l, textCorsds.t);

  // finalize the PDF and end the stream
  doc.end();
}