const server = require('../app.js');
const request = require('supertest');
const { closeDb, openDb } = require('../db/database.js');

afterAll(async () => {
    await closeDb();
    server.close();
});

describe('Tests for document routes', () => {
    let docId = '';
    describe('GET /api/documents', () => {
        it('should return all documents', async () => {
            const response = await request(server).get('/api/documents');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /api/documents', () => {
        it('should create one document', async () => {
            const body = {
                title: 'test',
                content: 'from test',
            };

            const response = await request(server)
                .post('/api/documents')
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.title).toEqual('test');
            docId = response.body._id;
        });
    });

    describe('GET /api/documents/:id', () => {
        it('should return one document', async () => {
            const response = await request(server).get(
                `/api/documents/${docId}`
            );
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect({
                _id: docId,
                title: 'test',
                content: 'from test',
            });
        });
    });

    describe('PUT /api/documents/:id', () => {
        it('should update one document', async () => {
            const body = {
                title: 'test update',
                content: 'from test update',
            };

            const response = await request(server)
                .put(`/api/documents/${docId}`)
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect({
                _id: docId,
                title: 'test update',
                content: 'from test update',
            });
        });
    });

    describe('DELETE /api/documents/:id', () => {
        it('Should delete one document based on id', async () => {
            const response = await request(server).delete(
                `/api/documents/${docId}`
            );
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect({
                message: 'Document deleted successfully',
            });
        });
    });
});

describe('Failure tests for documents', () => {
    describe('GET /api/documents', () => {
        it('Should return error 500', async () => {
            await closeDb();
            const response = await request(server).get('/api/documents');
            expect(response.status).toBe(500);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('POST /api/documents/:id', () => {
        it('Should return 400', async () => {
            const body = {
                title: 'test',
                content: '',
            };

            const response = await request(server)
                .post('/api/documents')
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 500', async () => {
            await closeDb();
            const body = {
                title: 'test',
                content: 'testingtesting',
            };

            const response = await request(server)
                .post('/api/documents')
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(500);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('GET /api/documents/:id', () => {
        it('Should return 404', async () => {
            const response = await request(server).get('/api/documents/123');
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 404', async () => {
            const id = '88ed53f2a1ff425e639b85d8';
            await openDb();
            const response = await request(server).get(`/api/documents/${id}`);
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 500', async () => {
            const id = '88ed53f2a1ff425e639b85d8';
            await closeDb();
            const response = await request(server).get(`/api/documents/${id}`);
            expect(response.status).toBe(500);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('PUT /api/documents/:id', () => {
        it('Should return 404', async () => {
            const response = await request(server).put('/api/documents/123');
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 400', async () => {
            const id = '88ed53f2a1ff425e639b85d8';
            const body = {
                title: 'test',
                content: '',
            };

            const response = await request(server)
                .put(`/api/documents/${id}`)
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 404', async () => {
            const id = '88ed53f2a1ff425e639b85d8';

            const body = {
                _id: id,
                title: 'test',
                content: 'test update',
            };
            await openDb();
            const response = await request(server)
                .put(`/api/documents/${id}`)
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 500', async () => {
            const id = '88ed53f2a1ff425e639b85d8';
            const body = {
                _id: id,
                title: 'test',
                content: 'test update',
            };
            await closeDb();
            const response = await request(server)
                .put(`/api/documents/${id}`)
                .send(body)
                .set('Accept', 'application/json');
            expect(response.status).toBe(500);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('DELETE /api/documents/:id', () => {
        it('Should return 404', async () => {
            const response = await request(server).delete(`/api/documents/123`);
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 404', async () => {
            const id = '88ed53f2a1ff425e639b85d8';
            await openDb();
            const response = await request(server).delete(
                `/api/documents/${id}`
            );
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('Should return 500', async () => {
            const id = '88ed53f2a1ff425e639b85d8';
            await closeDb();

            const response = await request(server).delete(
                `/api/documents/${id}`
            );
            expect(response.status).toBe(500);
            expect(response.body).toBeInstanceOf(Object);
        });
    });
});
