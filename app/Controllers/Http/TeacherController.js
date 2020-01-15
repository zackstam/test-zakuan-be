'use strict'
const Teacher = use('App/Models/Teacher')
class TeacherController {

    async paginate({ request, response }) {

        try {            
            let pagination = request.only(['page', 'limit', 'sortOrder', 'nameLike'])
            const page = parseInt(pagination.page, 10) + 1 || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            let query = Teacher.query()
                        .with('subject')
            if (pagination.nameLike) {
                query = query.where('name', 'LIKE', `%${pagination.nameLike}%`)
            }
            query = query.orderBy('id', pagination.sortOrder).paginate(page, limit);
            const teachers = await query;
            return response.json(teachers)

        } catch (error) {
            throw error
        }
        
    }
    async index ({response}) {
        const teachers = await Teacher.query()
                        .with('subject')
                        .fetch();
        return response.status(200).json({
            status: 'OK',
            message: 'Succesfully get teacher',
            data: teachers
        })

    }

    async store ({request, response}) {
        const teacherInfo = request.only(['name'])
        const teacher = new Teacher()
        teacher.name = teacherInfo.name
        await teacher.save()
        return response.status(200).json({
            status: 'OK',
            message: 'Succesfully save teacher',
            data: teacher
        })
    }

    async update ({params, request, response}) {
        const teacherInfo = request.only(['id', 'name'])
        const teacher = await Teacher.find(teacherInfo.id)
        if (!teacher) {
          return response.status(404).json({
            message: 'Resource not found'
          })
        }
        teacher.name = teacherInfo.name

        await teacher.save()

        return response.status(200).json({
            status: 'OK',
            message: 'Succesfully update teacher',
            data: teacher
        })
      }

    async show ({params, response}) {
        const teacher = await Teacher.find(params.id)

        return response.json({
            status: 'OK',
            message: 'Succesfully get detail teacher',
            data: teacher
        })
    }

    async delete ({params, response}) {
        const teacher = await Teacher.find(params.id)
        if (!teacher) {
          return response.status(404).json({message: 'Resource not found'})
        }
        await teacher.delete()

        return response.status(200).json({ status: 'OK'})
    }
}

module.exports = TeacherController
