import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { initializeDatabase } from '../../infra-mysql/connection';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  const { path, httpMethod } = event;

  await initializeDatabase();

  console.info('Lambda invocation event', { path, httpMethod });

  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
      }),
    };
    console.info(
      `Successful response from API endpoint: ${path}`,
      response.body,
    );
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
    console.error(`Error response from API endpoint: ${err}`, response.body);
  }

  return response;
};
