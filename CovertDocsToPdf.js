const docxConverter = require('docx-pdf');
const { uploadFile } = require('./upload');

module.exports.ConvertDocxsToPdf = async (req, res) => {
    try {
        // Télécharger le fichier
        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    message: 'Une erreur est survenue lors du téléchargement du fichier.',
                    error: err.message
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: 'Aucun fichier trouvé dans la requête.'
                });
            }

            const input = req.file.path;
            const output = req.file.filename + '.pdf';

            // Convertir DOCX en PDF
            docxConverter(input, output, function (err, result) {

                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: 'Erreur lors de la conversion du fichier.',
                        error: err.message
                    });
                }

                // Envoyer le fichier converti au client
                res.download(output, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            message: 'Erreur lors de l\'envoi du fichier.',
                            error: err.message
                        });
                    }
                });
            });

        });
    } catch (error) {
        console.error('Erreur interne :', error);
        return res.status(500).json({
            message: 'Erreur interne du serveur.',
            error: error.message
        });
    }
};