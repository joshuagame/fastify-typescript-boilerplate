import { Container } from 'typedi';
import { AccountController } from '../../context/account/account.controller';
import fastifyCookie from 'fastify-cookie';

export default async function(fastify, opts) {
  // Allow working with cookies
  fastify.register(fastifyCookie);

  fastify.post('/account/create', async function(
    { body: { userName, email, password } },
    reply,
  ) {
    const accountController = Container.get(AccountController);
    return accountController.create({ userName, email, password });
  });
  fastify.get('/account', async function(request, reply) {
    const accountController = Container.get(AccountController);
    return accountController.getAll();
  });
  fastify.post('/account/login', async function(
    { body: { userName, password } },
    reply,
  ) {
    const accountController = Container.get(AccountController);

    try {
      const jwt = await accountController.createJwt({ userName, password });
      reply.setCookie('jwt', jwt, { httpOnly: true, secure: true });
      return { userName };
    } catch (e) {
      reply.code(401);
    }
    return {};
  });
  fastify.get('/account/verify', async function(request, reply) {
    if (!request.headers.authorization) {
      reply.code(401);
    }
    const accountController = Container.get(AccountController);
    const token = request.headers.authorization.replace(/Bearer /, '');

    // Docs: https://github.com/auth0/node-jsonwebtoken
    return {
      tokenIsValid: AccountController.validateJwt({ jwt: token }),
    };
  });
  fastify.post('account/close', async function(
    { body: { username, password } },
    reply,
  ) {
    // TODO: (bdietz) -
    return;
  });
}