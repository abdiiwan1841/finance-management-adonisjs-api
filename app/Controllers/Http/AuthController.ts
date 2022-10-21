import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticateUser from 'App/Validators/AuthenticateUserValidator'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(AuthenticateUser)
    const { token } = await auth
      .use('api')
      .attempt(email, password, { expiresIn: process.env.TOKEN_EXPIRATION })

    return response.ok({ access_token: token })
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }

  public async profile({ auth }: HttpContextContract) {
    const { id, name, email } = auth.user

    return {
      id,
      name,
      email,
    }
  }
}
