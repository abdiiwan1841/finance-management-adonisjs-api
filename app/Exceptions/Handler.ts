import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

const BadRequestResponse = {
  code: 'BAD_REQUEST',
  message: 'Invalid credentials',
  status: 400,
}
const notFoundResponse = { code: 'NOT_FOUND', message: 'Resource not found', status: 404 }
const unauthorizedResponse = { code: 'UNAUTHORIZED', message: 'Unauthorized access', status: 401 }
const forbiddenResponse = {
  code: 'FORBIDDEN',
  message: 'Forbidden access',
  status: 403,
}
const tooManyRequestsResponse = {
  code: 'TOO_MANY_REQUESTS',
  message: 'Too many requests',
  status: 429,
}

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: Exception, context: HttpContextContract) {
    if (['E_INVALID_AUTH_UID', 'E_INVALID_AUTH_PASSWORD'].includes(error.code || ''))
      return context.response.status(error.status).send(BadRequestResponse)
    else if (['E_ROW_NOT_FOUND', 'E_ROUTE_NOT_FOUND'].includes(error.code || ''))
      return context.response.status(error.status).send(notFoundResponse)
    else if (error.code === 'E_UNAUTHORIZED_ACCESS')
      return context.response.status(error.status).send(unauthorizedResponse)
    else if (error.code === 'E_AUTHORIZATION_FAILURE')
      return context.response.status(error.status).send(forbiddenResponse)
    else if (error.code === 'E_TOO_MANY_REQUESTS')
      return context.response.status(error.status).send(tooManyRequestsResponse)

    return super.handle(error, context)
  }
}
