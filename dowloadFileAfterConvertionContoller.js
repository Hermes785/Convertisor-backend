const { downloadFileAfterConversionService } = require("./dowloadFileAfterConvertion");


module.exports.dowloadFileAfterConvertionCOntroller = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        console.log(requestId)
        if (!requestId) {
            return res.status(400).json({ message: "Aucun requestId fourni" });
        };
        const fileUrl = await downloadFileAfterConversionService(requestId);
        if (!fileUrl) {
            return res.status(404).json({ message: "Le fichier n'est pas disponible" });
        }
        res.status(200).json(fileUrl);

    } catch (error) {
        console.error('Erreur interne :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });

    }
}