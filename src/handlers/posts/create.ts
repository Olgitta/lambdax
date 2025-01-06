import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
const logger = new Logger();

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  const { path, httpMethod } = event;
  const { awsRequestId } = context;

  // Append awsRequestId to each log statement
  logger.appendKeys({
    requestId: awsRequestId,
  });

  // Log the incoming event
  logger.info('Lambda invocation event', { path, httpMethod });

  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
      }),
    };
    logger.info(
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
    logger.error(`Error response from API endpoint: ${err}`, response.body);
  }

  return response;
};
