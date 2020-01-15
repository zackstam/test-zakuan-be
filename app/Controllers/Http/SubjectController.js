'use strict'
const Subject = use('App/Models/Subject')
class SubjectController {
    async paginate({ request, response }) {

        try {            
            let pagination = request.only(['page', 'limit', 'sortOrder', 'nameLike'])
            const page = parseInt(pagination.page, 10) + 1 || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            let query = Subject.query()
                        .with('teacher');
            if (pagination.nameLike) {
                query = query.where('name', 'LIKE', `%${pagination.nameLike}%`)
            }
            query = query.orderBy('id', pagination.sortOrder).paginate(page, limit);
            const subjects = await query;
            return response.status(200).json(subjects)

        } catch (error) {
            throw error
        }
        
    }
    async index ({response}) {
 
      try {
        const subjects = await Subject.query()
        .with('teacher')
        .fetch();

        return response.json(subjects)
      } catch (error) {
          console.log(error)
          throw error;
      }

    }

    async store ({request, response}) {
        const subjectInfo = request.only(['name', 'teacher_id'])
        const subject = new Subject()
        subject.name = subjectInfo.name
        subject.teacher_id = subjectInfo.teacher_id
        await subject.save()
        return response.status(200).json(subject)
    }

    async update ({params, request, response}) {
        const subjectInfo = request.only(['id', 'teacher_id', 'name'])
        const subject = await Subject.find(subjectInfo.id)
        if (!subject) {
          return response.status(404).json({
            message: 'Resource not found'
          })
        }
        subject.name = subjectInfo.name
        subject.teacher_id = subjectInfo.teacher_id

        await subject.save()

        return response.status(200).json(subject)
      }

    async show ({params, response}) {
        const subject = await Subject.find(params.id)

        return response.json({
            status: 'OK',
            message: 'Succesfully get detail subject',
            data: subject
        })
    }

    async delete ({params, response}) {
        const subject = await Subject.find(params.id)
        if (!subject) {
          return response.status(404).json({message: 'Resource not found'})
        }
        await subject.delete()

        return response.status(200).json({ status: 'OK'})
    }
}

module.exports = SubjectController
