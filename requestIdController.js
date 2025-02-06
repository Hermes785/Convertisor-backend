const { kafkaService } = require("./kafkaService");
const { minioService } = require("./minioService");
const { uploadFile } = require('./upload');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');
function containsLettersndCHaracter(result) {
    return /^(?=.*[a-z])(?=.*\d).+$/.test(result);
}
const generateId = async () => {
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

        if (!req.file) {
            return res.status(400).json({
                message: 'Aucun fichier trouvé dans la requête.'
            });
        }

        const input = path.resolve(req.file.path)
        const filename = req.file.filename;
        console.log(input);

        if (!fs.existsSync(input)) {
            console.error('Le fichier PDF téléchargé est introuvable :', input);
            return res.status(400).json({
                message: "Le fichier PDF n'a pas été trouvé après téléchargement."
            });
        }
        const requestid = await generateId()
        const minio = await minioService(filename, input)
        const bucketName = minio.bucketName
        await kafkaService(requestid, bucketName, filename)
        return res.status(200).json(requestid)

    })
}