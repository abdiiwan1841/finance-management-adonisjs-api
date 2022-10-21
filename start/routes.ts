import Route from '@ioc:Adonis/Core/Route'

// Auth
Route.post('api/v1/auth/login', 'AuthController.login').middleware('throttle:global')
Route.post('api/v1/auth/logout', 'AuthController.logout')
  .middleware('auth')
  .middleware('throttle:global')
Route.get('/api/v1/profile', 'AuthController.profile')
  .middleware('auth')
  .middleware('throttle:global')

// Users
Route.post('/api/v1/users/create', 'UsersController.create').middleware('throttle:global')
Route.get('/api/v1/users/:id', 'UsersController.findById')
  .middleware('auth')
  .middleware('throttle:global')
Route.put('/api/v1/users/update/:id', 'UsersController.update')
  .middleware('auth')
  .middleware('throttle:global')

// Accounts
Route.post('/api/v1/accounts/create', 'AccountsController.create')
  .middleware('auth')
  .middleware('throttle:global')
Route.get('/api/v1/accounts/:id', 'AccountsController.findById')
  .middleware('auth')
  .middleware('throttle:global')
Route.put('/api/v1/accounts/update/:id', 'AccountsController.update')
  .middleware('auth')
  .middleware('throttle:global')
Route.delete('/api/v1/accounts/:id', 'AccountsController.remove')
  .middleware('auth')
  .middleware('throttle:global')

// Transactions
Route.post('/api/v1/transactions/create', 'TransactionsController.create')
  .middleware('auth')
  .middleware('throttle:global')
Route.get('/api/v1/transactions/:id', 'TransactionsController.findById')
  .middleware('auth')
  .middleware('throttle:global')
Route.delete('/api/v1/transactions/:id', 'TransactionsController.remove')
  .middleware('auth')
  .middleware('throttle:global')
