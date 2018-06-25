const PDFDocument = require('pdfkit'),
  path = require('path');

module.exports = function renderPDFtemplate(req, res) {
  const tpl = res.locals.pdfTemplate;

   // width 842 Pixels x height 595 Pixels
  const doc = new PDFDocument({ size: [
    res.locals.PDFSizeWidth || 824,
    res.locals.PDFSizeHeight || 595
  ]});

  doc.font(path.join(__dirname, 'roboto.ttf'));

  doc.pipe(res);

  const textCorsds = req.we.config.certification.textPositions[tpl.textPosition];

  if (tpl.image && tpl.image[0] && tpl.image[0].isLocalStorage) {
    const image = tpl.image[0];

    const storage = req.we.config.upload.storages[image.storageName];
    let imagePath = storage.getPath('original', image.name);
    doc.image(imagePath, 0, 0, { width: 824 });
  }

  doc.fontSize(textCorsds.fontSize || 24);
  doc.text(res.locals.data.text, textCorsds.l, textCorsds.t, textCorsds.options);

  // finalize the PDF and end the stream
  doc.end();
}