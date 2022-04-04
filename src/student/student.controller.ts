import { Controller, Get, HttpStatus, Query, Request, Body, Post, Param } from '@nestjs/common';
import { StudentService } from './student.service'
@Controller('/')
export class StudentController {
    constructor(
        private StudentService: StudentService,
    ) { }

    @Get('students')
    public async fetchStudents() {
        let studentList = []
        var statusCode
        let erroMessage
        studentList = await this.StudentService.fetchStudents()
        if (studentList instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(studentList).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no user with such details"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentList,
            erroMessage: erroMessage
        };
    }

    @Get('student/:student_id/classes')
    public async fetchclassForAStudent(@Param() param) {
        let studentInfo
        var statusCode
        let erroMessage
        studentInfo = await this.StudentService.fetchclassForAStudent(parseInt(param.student_id))
        if (studentInfo instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(studentInfo).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no user with such details"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentInfo,
            erroMessage: erroMessage
        };

    }

    @Get('student/:student_id/performance')
    public async fetchStudentGrades(@Param() param) {
        let studentInfo
        var statusCode
        let erroMessage
        studentInfo = await this.StudentService.fetchStudentGrades(parseInt(param.student_id))
        if (studentInfo instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(studentInfo).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no user with such details"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentInfo,
            erroMessage: erroMessage
        };
    }


    @Get('classes')
    public async fetchDistinctClasses() {
        let distinctClasses
        var statusCode
        let erroMessage
        distinctClasses = await this.StudentService.fetchDistinctClasses()
        if (distinctClasses instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(distinctClasses).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no user with such details"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: distinctClasses,
            erroMessage: erroMessage
        };


    }


    @Get('class/:class_id/students')
    public async fetchClassInfo(@Param() param) {
        let studentInfo
        var statusCode
        let erroMessage
        studentInfo = await this.StudentService.fetchClassInfo(parseInt(param.class_id))
        if (studentInfo instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(studentInfo).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no such class"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentInfo,
            erroMessage: erroMessage
        };

    }


    @Get('class/:class_id/performance')
    public async fetchClassPerformance(@Param() param) {
        let studentInfo
        var statusCode
        let erroMessage
        studentInfo = await this.StudentService.fetchClassPerformance(parseInt(param.class_id))

        if (studentInfo instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(studentInfo).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no such class"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentInfo,
            erroMessage: erroMessage
        };

    }

    @Get('class/:class_id/student/:student_id')
    public async fetchStudentInfo(@Param() param) {
        let studentInfo
        var statusCode
        let erroMessage
        studentInfo = await this.StudentService.fetchStudentInfo(parseInt(param.class_id), parseInt(param.student_id))

        if (studentInfo instanceof Error) {
            statusCode = 500
            erroMessage = "something went wrong"
        } else if (Object.keys(studentInfo).length === 0) {

            statusCode = 200
            erroMessage = "no user with such details"
        }
        else {

            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentInfo,
            erroMessage: erroMessage
        };

    }

    @Get('student/:student_id/class/:class_id')
    public async fetchStudentInfo1(@Param() param) {
        let studentInfo
        var statusCode
        let erroMessage
        studentInfo = await this.StudentService.fetchStudentInfo(parseInt(param.class_id), parseInt(param.student_id))

        if (studentInfo instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            erroMessage = "something went wrong"
        } else if (Object.keys(studentInfo).length === 0) {
            statusCode = HttpStatus.OK
            erroMessage = "no user with such details"
        }
        else {
            statusCode = HttpStatus.OK
        }

        return {
            statusCode: statusCode,
            data: studentInfo,
            erroMessage: erroMessage
        };

    }


    // @Get('class/:class_id/final-grade-sheet')
    // public async finalGrade(@Param() param) {
    //     let studentInfo
    //     var statusCode
    //     let erroMessage
    //     studentInfo = await this.StudentService.finalGrade(parseInt(param.class_id))

    //     if (studentInfo instanceof Error) {
    //         statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    //         erroMessage = "something went wrong"
    //     } else if (Object.keys(studentInfo).length === 0) {
    //         statusCode = HttpStatus.OK
    //         erroMessage = "no user with such details"
    //     }
    //     else {
    //         statusCode = HttpStatus.OK
    //     }

    //     return {
    //         statusCode: statusCode,
    //         data: studentInfo,
    //         erroMessage: erroMessage
    //     };

    // }

}
