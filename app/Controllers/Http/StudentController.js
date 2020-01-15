'use strict'

const Student = use('App/Models/Student');

class StudentController {

    async paginate({ request, response }) {

        try {            
            let pagination = request.only(['page', 'limit', 'sortOrder', 'nameLike'])
            const page = parseInt(pagination.page, 10) + 1 || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            let query = Student.query().with('subject');
            if (pagination.nameLike) {
                query = query.where('name', 'LIKE', `%${pagination.nameLike}%`)
            }
            query = query.orderBy('id', pagination.sortOrder).paginate(page, limit);
            const students = await query;
            return response.json(students)

        } catch (error) {
            throw error
        }
        
    }
    async index ({response}) {
        const students = await Student.query()
                        .with('address')
                        .with('subject')
                        .fetch();
        return response.status(200).json({
            status: 'OK',
            message: 'Succesfully get student',
            data: students
        })

    }

    async store ({request, response}) {
        const studentInfo = request.only(['nisn', 'name', 'study', 'subjects'])
        const student = new Student()

        student.nisn = studentInfo.nisn
        student.name = studentInfo.name
        student.study = studentInfo.study
        await student.save()
        const subjects = [];
        for (const subjectObj of studentInfo.subjects) {
            subjects.push(subjectObj.subject_id)
        }
        student.subject().attach(subjects)
        return response.status(200).json({
            status: 'OK',
            message: 'Succesfully save student',
            data: student
        })
    }

    async update ({params, request, response}) {
        const studentInfo = request.only(['id', 'nisn', 'name', 'study'])
        const student = await Student.find(studentInfo.id)
        if (!student) {
          return response.status(404).json({
            message: 'Resource not found'
          })
        }
        student.nisn = studentInfo.nisn
        student.name = studentInfo.name
        student.study = studentInfo.study

        await student.save()

        return response.status(200).json({
            status: 'OK',
            message: 'Succesfully update student',
            data: student
        })
      }

    async show ({params, response}) {
        const student = await Student.find(params.id)

        return response.json({
            status: 'OK',
            message: 'Succesfully get detail student',
            data: student
        })
    }

    async delete ({params, response}) {
        const student = await Student.find(params.id)
        if (!student) {
          return response.status(404).json({message: 'Resource not found'})
        }
        await student.delete()

        return response.status(200).json({ status: 'OK'})
    }
}

module.exports = StudentController
