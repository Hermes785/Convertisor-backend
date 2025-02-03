const { minioService } = require("./minioService");
const { uploadFile } = require('./upload');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');
function containsLettersndCHaracter(result) {
    return /^(?=.*[a-z])(?=.*\d).+$/.test(result);
}
const generateId = () => {
    let result = ""
    const charactere = '1234567890qwertyuioplkjhgfasdzxcvbnm'
    const charactereLenght = charactere.length
    for (i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charactereLenght)
        result += charactere[randomIndex]
    }

    return containsLettersndCHaracter(result) ? result : generateId()


}

module.exports.sendRequestIdAfterUpload = async (req, res) => {

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

        const input = path.resolve(req.file.path)// Fichier PDF téléchargé
        // const sanitizedFilename = req.file.filename
        //  .normalize("NFD")
        //  .replace(/[\u0300-\u036f]/g, "")
        //  .replace(/[^a-zA-Z0-9.\-_]/g, "_"); // Remplace les caractères non valides
        //   const output = path.resolve(__dirname, "uploads", `${sanitizedFilename}.docx`);
        /// console.log(`${sanitizedFilename}.docx`)
        // Fichier Word généré

        // Vérifiez si le fichier PDF téléchargé existe
        if (!fs.existsSync(input)) {
            console.error('Le fichier PDF téléchargé est introuvable :', input);
            return res.status(400).json({
                message: "Le fichier PDF n'a pas été trouvé après téléchargement."
            });
        }
        const requestid = generateId()
        await minioService(requestid, input)
        return res.status(200).json(requestid)

    })
}