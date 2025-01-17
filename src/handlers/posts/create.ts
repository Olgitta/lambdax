import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createPost } from './crud';
import { IPostCreatePayload, IPostRequestBody } from './definitions';
import { toJson } from '../../utils/jsonUtil';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  let { path, httpMethod, body } = event;
  console.info('Lambda invocation event', { path, httpMethod, body });

  try {
    // todo: validation
    if (!body) {
      body = '';
    }
    const parsedBody = toJson<IPostRequestBody>(body);
    console.log(JSON.stringify(parsedBody, null, 4));
    let payload: IPostCreatePayload = {
      userId: 1,
      title: parsedBody.title,
      content: parsedBody.content,
    };

    const result = await createPost(payload);
    console.log(JSON.stringify(result, null, 4));
    response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    // AWS Lambda has a hard limit of 6 MB for synchronous responses.
    response = {
      statusCode: 500,
      body: JSON.stringify({
        error: error,
      }),
    };
  }

  return response;
};
