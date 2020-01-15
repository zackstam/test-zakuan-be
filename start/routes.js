'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('order/paginate', 'OrderController.paginate')
  Route.get('order', 'OrderController.index')
}).prefix('api/v1')

Route.group(() => {
  Route.get('package/paginate', 'PackageController.paginate')
  Route.get('package', 'PackageController.index')
}).prefix('api/v1')

Route.group(() => {
  Route.get('students/paginate', 'StudentController.paginate')
  Route.get('students', 'StudentController.index')
  Route.get('students/:id', 'StudentController.show')
  Route.post('students', 'StudentController.store')
       .validator('Student')
  Route.put('students', 'StudentController.update')
  Route.delete('students/:id', 'StudentController.delete')
}).prefix('api/v1')

Route.group(() => {
  Route.get('teachers/paginate', 'TeacherController.paginate')
  Route.get('teachers', 'TeacherController.index')
  Route.get('teachers/:id', 'TeacherController.show')
  Route.post('teachers', 'TeacherController.store')
  Route.put('teachers', 'TeacherController.update')
  Route.delete('teachers/:id', 'TeacherController.delete')
}).prefix('api/v1')

Route.group(() => {
  Route.get('subjects/paginate', 'SubjectController.paginate')
  Route.get('subjects', 'SubjectController.index')
  Route.get('subjects/:id', 'SubjectController.show')
  Route.post('subjects', 'SubjectController.store')
  Route.put('subjects', 'SubjectController.update')
  Route.delete('subjects/:id', 'SubjectController.delete')
}).prefix('api/v1')
