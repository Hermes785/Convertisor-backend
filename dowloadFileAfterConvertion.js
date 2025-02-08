const { GetConsoleOutputCommand } = require("@aws-sdk/client-ec2");
const { dataBase } = require("./db");

module.exports.downloadFileAfterConversionService = async (requestId) => {
    let connection;
    try {
        connection = await dataBase();
        const [rows] = await connection.execute(
            `SELECT urlGenerated FROM file WHERE requestId = ?`,
            [requestId]
        );

        if (rows.length === 0) {
            throw new Error('Aucune URL trouvée.');
        }
        return rows[0].urlGenerated
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL générée :', error);

    } finally {
        if (connection) {
            await connection.end();
            console.log("Connexion à la base de données fermée.");
        }
    }
};
