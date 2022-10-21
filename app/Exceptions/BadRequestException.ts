import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class BadRequestException extends Exception {
  public code = 'BAD_REQUEST'
  public status = 400

  public async handle(error: this, context: HttpContextContract) {
    return context.response
      .status(error.status)
      .send({ code: error.code, message: error.message, status: error.status })
  }
}
