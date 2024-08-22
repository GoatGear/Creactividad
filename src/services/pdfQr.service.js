import PDFDocument from 'pdfkit';

export function buildPDF(user, qrCodeImage, dataCallback, endCallBack) {
    const doc = new PDFDocument();

    doc.on('data', dataCallback);
    doc.on('end', endCallBack);

    doc.fontSize(20).text(`Usuario: ${user.nombre}`);
    doc.fontSize(16).text(`Email: ${user.correo}`);
    doc.moveDown();
    doc.image(qrCodeImage, {
        fit: [150, 150],
        align: 'center',
        valign: 'center'
    });

    doc.end();
}

