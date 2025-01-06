// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');

const secret_name = 'mysql/devel';

const client = new SecretsManagerClient({
    region: 'eu-north-1',
});

(async () => {

    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
            }),
        );
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }

    const secret = response.SecretString;
console.log(typeof secret, JSON.parse(secret));
    // string {
    //     username: 'root',
    //         password: 'sa',
    //         engine: 'mysql',
    //         host: 'devel.chgssmycw9ms.eu-north-1.rds.amazonaws.com',
    //         port: 3306,
    //         dbInstanceIdentifier: 'devel'
    // }

return secret;
})();
