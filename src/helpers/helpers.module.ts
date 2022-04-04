import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { MongoDbService } from './db/mongo-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import {StudentsSchema,Students} from './db/schema/student.schema'
import {GradesSchema,Grades} from './db/schema/grades.schema'
@Module({
  providers: [HelpersService, MongoDbService],
  imports: [
    MongooseModule.forFeature([{ name: Students.name, schema: StudentsSchema }]),
    MongooseModule.forFeature([{ name: Grades.name, schema: GradesSchema }])

  ],
  exports: [MongoDbService]
})
export class HelpersModule { }