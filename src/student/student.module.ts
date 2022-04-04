import { Module } from '@nestjs/common';
import {StudentService} from './student.service'
import {StudentController} from './student.controller'
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
    providers: [StudentService],
    controllers: [StudentController],
    imports: [HelpersModule],
})
export class StudentModule {
   
}
