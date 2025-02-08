const Minio = require('minio');

module.exports.minioService = async (filename, filePath) => {
    const minioClient = new Minio.Client({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    });

    const bucketName = 'uploads';

    try {
        // Vérifier si le bucket existe
        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
            console.log(`Le bucket ${bucketName} n'existe pas, création en cours...`);
            await minioClient.makeBucket(bucketName, 'us-east-1');
            console.log(`Bucket ${bucketName} créé avec succès`);
        } else {
            console.log(`Bucket ${bucketName} déjà existant`);
        }

        // Upload du fichier
        await minioClient.fPutObject(bucketName, filename, filePath);
        console.log(`Fichier "${filename}" uploadé avec succès dans ${bucketName}`);


        // const url = await minioClient.presignedGetObject(bucketName, filename, 600);
        // console.log(`L'url generé est: ${url} `)

        return { bucketName, filename };
    } catch (err) {
        console.error('Erreur MinIO:', err);
        throw err;
    }


};
