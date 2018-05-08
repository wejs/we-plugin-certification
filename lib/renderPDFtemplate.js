const PDFDocument = require('pdfkit');

module.exports = function renderPDFtemplate(req, res) {
  const tpl = res.locals.pdfTemplate;

   // width 842 Pixels x height 595 Pixels
  const doc = new PDFDocument({ size: [
    res.locals.PDFSizeWidth || 824,
    res.locals.PDFSizeHeight || 595
  ]});

  doc.pipe(res);

  const textCorsds = req.we.config.certification.textPositions[tpl.textPosition];

  if (tpl.image && tpl.image[0]) {
    let imagePath = req.we.db.models.image.getImagePath(null, tpl.image[0].name);
    doc.image(imagePath, 0, 0, { width: 824 });
  }

  doc.fontSize(24);
  doc.text(res.locals.data.text, textCorsds.l, textCorsds.t);

  // finalize the PDF and end the stream
  doc.end();
}