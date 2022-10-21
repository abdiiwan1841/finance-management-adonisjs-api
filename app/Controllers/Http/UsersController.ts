import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ConflictException } from 'App/Exceptions/ConflictException'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUser)

    const userEmail = await User.findBy('email', payload.email)
    if (userEmail) throw new ConflictException('Email already exists')

    const user = await User.create(payload)
    return response.created({ user })
  }

  public async findById({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.findOrFail(id)
    const accounts = await user.related('accounts').query()

    await bouncer.authorize('getUserData', user)

    return response.ok({ user, accounts })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const { name, email, password } = await request.validate(UpdateUser)
    const id = request.param('id')
    const user = await User.findOrFail(id)

    await bouncer.authorize('updateUser', user)

    user.name = name
    user.email = email
    user.password = password
    await user.save()

    return response.ok({ user })
  }
}
