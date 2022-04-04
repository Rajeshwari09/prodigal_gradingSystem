import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type GradesDocument = Grades & Document;

@Schema({timestamps:true})
export class Grades {
  @Prop({ required: true, type: mongooseSchema.Types.Number })
  student_id: Number;
  @Prop({ required: true, type: mongooseSchema.Types.Number })
  class_id: Number;
  @Prop({ required: true, type: mongooseSchema.Types.Array })
  scores: [];
}

export const GradesSchema = SchemaFactory.createForClass(Grades);

