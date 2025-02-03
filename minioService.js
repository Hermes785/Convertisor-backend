const minio = require('minio')

module.exports.minioService = async (filename, filePAth) => {
    // Initialize Minio client
    const minioClient = new minio.Client({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    });
    ;
    if (!minioClient) {
        console.log('Error initializing Minio client');
        return;
    }

    // Check if the bucket exists
    const bucketName = 'uploads';
    minioClient.bucketExists(bucketName, (err, exists) => {
        if (err) {
            return console.log(err);
        }
        if (exists) {
            console.log(`Bucket ${bucketName} already exists`);
        } else {
            // Make a new bucket
            minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
                if (err) {
                    return console.log(err);
                }
                console.log(`Bucket ${bucketName} created successfully`);
            });
        }
    });
    const filePath = filePAth;
    const objectName = filename;

    minioClient.fPutObject(bucketName, objectName, filePath, (err, etag) => {
        if (err) {
            return console.log(err);
        }
        console.log(`File uploaded successfully. name: ${objectName}`);
    });

}



