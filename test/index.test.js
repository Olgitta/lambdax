const { handler } = require('../dist/index');

describe('Lambdax', () => {
    test('GET request should return 456', async () => {
        const mockEvent = { httpMethod: 'GET' };
        const response = await handler(mockEvent);
        expect(response.statusCode).toBe('200');
        expect(response.body).toBe(JSON.stringify('456'));
    });

    test('Unsupported method should return 400', async () => {
        const mockEvent = { httpMethod: 'PATCH' };
        const response = await handler(mockEvent);
        expect(response.statusCode).toBe('400');
    });
})

