const { Kafka } = require('kafkajs')

const kafkaClient = new Kafka({
    clientId: 'convertor-client',
    //logLevel: 'error',
    brokers: ['localhost:29092'],
})

module.exports.kafkaService = async (requestId, bucketName, filename) => {
    const producer = kafkaClient.producer()

    await producer.connect()


    const message = {
        bucket_Name: bucketName,
        requestId: requestId,
        file_name: filename,
        file_path: `${bucketName}/${filename}`
    }

    await producer.send({
        topic: 'files_to_convert',
        messages: [
            {
                key: requestId,
                value: JSON.stringify(message)
            },
        ],
    })
    console.log(`Message avec clé ${requestId} envoyé au topic ${filename}`)
    await producer.disconnect()
}
