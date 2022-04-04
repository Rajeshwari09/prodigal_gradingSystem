import {
  HttpException,
  Injectable,
  NotImplementedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AnyKeys, FilterQuery, Model, UpdateQuery } from "mongoose";
import { Students, StudentsDocument } from "./schema/student.schema";
import { GradesDocument, Grades } from "./schema/grades.schema";
@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(Students.name) private StudentsModel: Model<StudentsDocument>,
    @InjectModel(Grades.name) private GradeModel: Model<GradesDocument>) { }

  // AD ITEM

  public async fetchStudents() {
    return this.StudentsModel.aggregate([
      { "$project": { "student_id": "$_id", "student_name": "$name", "_id": 0 } }
    ]);
  }

  public async fetchclassForAStudent(student_id) {
    try {

      let gradeInfo = await this.GradeModel.find({ student_id: student_id }).select({ class_id: 1, _id: 0 })
      let studentName = await this.StudentsModel.find({ "_id": student_id }).select({ name: 1, _id: 0 })
      if (gradeInfo.length == 0) return {}
      return {
        "student_id": student_id,
        "student_name": studentName[0].name,
        "classes": gradeInfo
      }
    } catch (error) {
      console.log(error)
      return error
    }


  }

  public async fetchStudentGrades(student_id) {
    try {

      let gradeInfo = await this.GradeModel.aggregate([{ "$match": { "student_id": student_id } },
      {
        "$project": {
          "class_id": 1,
          "_id": 0,
          "total_marks": { '$convert': { 'input': { "$sum": "$scores.score" }, 'to': 'int' } }
        }
      }
      ])
      let studentName = await this.StudentsModel.find({ "_id": student_id }).select({ name: 1, _id: 0 })
      if (gradeInfo.length == 0) return {}
      return {
        "student_id": student_id,
        "student_name": studentName[0].name,
        "classes": gradeInfo
      }
    } catch (error) {
      console.log(error)
      return error
    }


  }


  public async fetchDistinctClasses() {
    try {

      let gradeInfo = await this.GradeModel.find().distinct("class_id")
      var classArray = []
      gradeInfo.forEach(element => {
        classArray.push({ "class_id": element })
      });
      if (gradeInfo.length == 0) return {}
      return classArray
    } catch (error) {
      console.log(error)
      return error
    }


  }


  public async fetchClassInfo(class_id) {
    try {
      let gradeInfo = await this.GradeModel.aggregate([{ "$match": { "class_id": class_id } },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "info",
        },
      },
      // Deconstructs the array field from the
      // input document to output a document
      // for each element
      { $unwind: "$info" },
      { "$project": { "student_id": "$student_id", "student_name": "$info.name", "_id": 0 } }

      ])
      if (gradeInfo.length == 0) return {}
      console.log(gradeInfo)
      return {
        "class_id": class_id,
        "students": gradeInfo
      }
    } catch (error) {
      console.log(error)
      return error
    }

  }

  public async fetchClassPerformance(class_id) {
    try {
      let gradeInfo = await this.GradeModel.aggregate([{ "$match": { "class_id": class_id } },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "info",
        },
      },
      // Deconstructs the array field from the
      // input document to output a document
      // for each element
      { $unwind: "$info" },
      {
        "$project": {
          "student_id": "$student_id",
          "student_name": "$info.name",
          "_id": 0,
          "total_marks": { '$convert': { 'input': { "$sum": "$scores.score" }, 'to': 'int' } }
        }
      }

      ])
      if (gradeInfo.length == 0) return {}
      console.log(gradeInfo)
      return {
        "class_id": class_id,
        "students": gradeInfo
      }
    } catch (error) {
      console.log(error)
      return error
    }

  }


  public async fetchStudentInfo(class_id, student_id) {

    try {
      let gradeInfo = await this.GradeModel.aggregate([{ "$match": { "class_id": class_id, "student_id": student_id } },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "info",
        },
      },
      // Deconstructs the array field from the
      // input document to output a document
      // for each element
      { $unwind: "$info" },
      {
        "$project": {
          "student_id": "$student_id",
          "student_name": "$info.name",
          "_id": 0,
          "marks": "$scores",
        }
      }

      ])
      // console.log(gradeInfo)
      if (gradeInfo.length == 0) return {}
      gradeInfo[0]["marks"].forEach(element => {
        element.marks = Math.round(element.score)
        delete (element.score)
      });
      // console.log(gradeInfo[0]["marks"])
      return {
        "class_id": class_id,
        "student_id": gradeInfo[0]['student_id'],
        "student_name": gradeInfo[0]['student_name'],
        "marks": gradeInfo[0]["marks"],

      }
    } catch (error) {
      console.log("1")
      console.log(error)
      return error
    }

  }


  public async finalGrade(class_id) {
    try {
      let gradeInfo = await this.GradeModel.aggregate([{ "$match": { "class_id": class_id } },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "info",
        },
      },
      // Deconstructs the array field from the
      // input document to output a document
      // for each element
      { $unwind: "$info" },
      {
        "$project": {
          "student_id": "$student_id",
          "student_name": "$info.name",
          "_id": 0,
          "details": "$scores",
          "marks": { '$convert': { 'input': { "$sum": "$scores.score" }, 'to': 'int' } },
          "total": { "$sum": { "$sum": "$scores.score" } }
        }

      },
      {
        "$group":
        {
          "_id": ' ',
          "totalAmount": { "$sum": { "$sum": "$scores.score" } },
        }
      }

      ])
      console.log(gradeInfo)
      return {
        "class_id": class_id,
        "students": gradeInfo
      }
    } catch (error) {
      console.log(error)
      return error
    }

  }

}