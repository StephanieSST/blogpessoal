import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: "db_blogpessoal_test.db",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: 'https://ik.imagekit.io/sst10/Mr.%20Bean.jpg?updatedAt=1714139195015'
      })
    .expect(201)

    usuarioId = resposta.body.id;

  });

  it('02 - Não Deve Duplicar o Usuário', async () => {
    return request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: 'https://ik.imagekit.io/sst10/Mr.%20Bean.jpg?updatedAt=1714139195015'
      })
      .expect(400)
  });

  it('03 - Deve Autenticar Usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
    .expect(200)

    token = resposta.body.token;

  });

  it('04 - Deve Listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Toor',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: 'https://ik.imagekit.io/sst10/Mr.%20Bean.jpg?updatedAt=1714139195015'
      })
      .expect(200)
      .then(resposta => {
        expect("Toor").toEqual(resposta.body.nome);
      });
  });

  it('06 - Deve buscar usuário pelo Id', async () => {
    let id = 1;
    return request(app.getHttpServer())
    .get(`/usuarios/${id}`)
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

});