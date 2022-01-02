import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateReviewDto } from "../src/review/dto/create-review.dto";
import { disconnect, Types } from "mongoose";
import { AppModule } from "../src/app.module";
import { REVIEW_NOT_FOUND } from "../src/review/review.constants";

const productId= new Types.ObjectId().toHexString() //toHexString() - переводит в строку = toString()

const testDto:CreateReviewDto = {
	name: 'test', description: 'test description', productId, rating: 5,title: 'Test-title'
}
describe('Review controller (e2e)', () => {
	let app: INestApplication;
	let createdID: string

// beforeEach - будет выполняться перед каждым тестом it
// beforeAll - будет выполняться перед всеми тестами
// afterEach - будет выполняться после каждым тестом it
// afterAll - будет выполняться после всех выполненых тестов

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async (done) => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201) //201 всегда возвращает метод POST при удачном исполнении
			.then((res: request.Response) => {
				createdID = res.body._id
				expect(createdID).toBeDefined()
				done()
			})
	});
	it('/review/create (POST) - fail - message', async (done) => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400) //201 всегда возвращает метод POST при удачном исполнении
			.then((res: request.Response) => {
				console.log(res.body);
				done()
			})
	});

	it('/review/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400) //400 всегда возвращает ValidatePipe если не соответсвует валидации (у нас 1-5 корректные данные)
	});

	it('/review/byProduct/:productId (GET) - success', async (done) => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200) //200 всегда возвращает метод GET удачном исполнении
			.then((res:  request.Response) => {
				expect(res.body.length).toBe(1)
				done()
			})
	});

	it('/review/byProduct/:productId (GET) - failed', async (done) => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200) //200 всегда возвращает метод GET удачном исполнении
			.then((res:  request.Response) => {
				expect(res.body.length).toBe(0)
				done()
			})
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdID)
			.expect(200) //200 всегда возвращает метод DELETE при удачном исполнении
	});

	it('/review/:id (DELETE) - failed', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND
			})
	});


	afterAll(() => {
		disconnect() //для отклчения базы
	});
});