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

  // Return local credentials for none production
  if (process.env.NODE_ENV !== 'production') {
    return {
      host: 'host.docker.internal',
      user: 'root',
      password: '',
      database: 'devel',
    };
  }

  const secretName = 'prod/mysql/devel';

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
