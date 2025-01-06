import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

interface IMysqlCredentials {
  host: string;
  user: string;
  password: string;
  database: string;
}

const REGION = 'eu-north-1';

export const getMysqlCredentials = async (): Promise<IMysqlCredentials> => {
  console.log(
    'Fetching MySQL credentials for environment:',
    process.env.NODE_ENV,
  );

  // Return local credentials for development
  if (process.env.NODE_ENV === 'dev') {
    return {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'devel',
    };
  }

  // Derive the secret name dynamically
  const secretName = `mysql/devel`;

  const client = new SecretsManagerClient({ region: REGION });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: 'AWSCURRENT', // Defaults to 'AWSCURRENT' if unspecified
      }),
    );

    if (!response.SecretString) {
      throw new Error('SecretString is empty or undefined.');
    }

    const credentials = JSON.parse(response.SecretString);

    // Map the secret fields to MySQL credentials format
    return {
      host: credentials.host,
      user: credentials.username,
      password: credentials.password,
      database: credentials.dbInstanceIdentifier,
    };
  } catch (error) {
    console.error('Failed to fetch MySQL credentials:', error);
    throw new Error(
      'Unable to retrieve MySQL credentials from AWS Secrets Manager.',
    );
  }
};

export default getMysqlCredentials;
