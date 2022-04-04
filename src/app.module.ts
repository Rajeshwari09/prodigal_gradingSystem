import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { HelpersModule } from './helpers/helpers.module';
  import configuration from "./config/configuration";
import * as Sentry from '@sentry/node';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { StudentModule } from './student/student.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "prod"
          ? ".env.prod"
          : process.env.NODE_ENV === "stage"
            ? ".env.stage"
            : ".env.dev",
      load: [configuration],
    }),
    HttpModule,
    MongooseModule.forRoot(process.env.DB_URL),
    HelpersModule,
    StudentModule, 
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}