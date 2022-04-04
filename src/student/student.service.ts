import { Injectable } from '@nestjs/common';
import { MongoDbService } from 'src/helpers/db/mongo-db.service'

@Injectable()
export class StudentService {
    constructor(
        private MongoDbService: MongoDbService
    ) { }
    public async fetchStudents() {
        let studentsList = await this.MongoDbService.fetchStudents()
        return studentsList
    }
    public async fetchclassForAStudent(student_id) {
        let studentsList = await this.MongoDbService.fetchclassForAStudent(student_id)
        return studentsList
    }


    public async fetchStudentGrades(student_id) {
        let studentsList = await this.MongoDbService.fetchStudentGrades(student_id)
        return studentsList
    }


    public async fetchDistinctClasses() {
        let studentsList = await this.MongoDbService.fetchDistinctClasses()
        return studentsList
    }

    public async fetchClassInfo(class_id) {
        let studentsList = await this.MongoDbService.fetchClassInfo(class_id)
        return studentsList
    }


    public async fetchClassPerformance(class_id) {
        let studentsList = await this.MongoDbService.fetchClassPerformance(class_id)
        return studentsList
    }


    public async fetchStudentInfo(class_id, student_id) {
        let studentsList = await this.MongoDbService.fetchStudentInfo(class_id, student_id)
        return studentsList
    }

    public async finalGrade(class_id) {
        let studentsList = await this.MongoDbService.finalGrade(class_id)
        return studentsList
    }
}
