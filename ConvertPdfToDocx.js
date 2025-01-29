const { PDFNet } = require('@pdftron/pdfnet-node');
const { uploadFile } = require('./upload');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports.convertPdfToDocxs = async (req, res) => {
    console.log('Licence PDFTron :', process.env.PDFTRON_LICENSE_KEY);

    try {

        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    message: 'Une erreur est survenue lors du téléchargement du fichier.',
                    error: err.message
                });
            }

            // Vérification si le fichier est bien présent dans la requête
            if (!req.file) {
                return res.status(400).json({
                    message: 'Aucun fichier trouvé dans la requête.'
                });
            }

            const input = path.resolve(req.file.path); // Fichier PDF téléchargé
            const sanitizedFilename = req.file.filename
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9.\-_]/g, "_"); // Remplace les caractères non valides
            const output = path.resolve(__dirname, "uploads", `${sanitizedFilename}.docx`);
            console.log(`${sanitizedFilename}.docx`)
            // Fichier Word généré

            // Vérifiez si le fichier PDF téléchargé existe
            if (!fs.existsSync(input)) {
                console.error('Le fichier PDF téléchargé est introuvable :', input);
                return res.status(400).json({
                    message: "Le fichier PDF n'a pas été trouvé après téléchargement."
                });
            }

            async function main() {
                // Chemin pour les ressources de PDFTron
                const structuredOutputPath = path.resolve(
                    "C:/Project/Convertisor-backend/Lib/Windows/StructuredOutput.exe"
                );
                await PDFNet.addResourceSearchPath(structuredOutputPath);

                // Charger et convertir le fichier PDF
                const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(input);
                await PDFNet.Convert.toWord(pdfdoc, output);

                console.log("Conversion réussie ! Fichier enregistré à :", output);
            }

            // Exécuter la conversion avec nettoyage après exécution
            PDFNet.runWithCleanup(main, process.env.PDFTRON_LICENSE_KEY)
                .catch((error) => {
                    console.error("Erreur avec la bibliothèque PDFTron :", error);
                    throw error;
                })
                .then(() => {
                    // Téléchargement du fichier converti
                    res.download(output, async (err) => {
                        try {
                            if (err) {
                                console.error('Erreur lors de l\'envoi du fichier converti :', err);
                                return res.status(500).json({
                                    message: 'Erreur lors de l\'envoi du fichier converti.',
                                    error: err.message
                                });
                            }
                        } finally {
                            // Nettoyer les fichiers temporaires après utilisation
                            if (fs.existsSync(input)) fs.unlinkSync(input);
                            if (fs.existsSync(output)) fs.unlinkSync(output);
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

module.exports.tes = (req, res) => {
    return res.status(200).json("nothing")

}