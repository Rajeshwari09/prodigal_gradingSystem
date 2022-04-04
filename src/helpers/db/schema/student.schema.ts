import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export type StudentsDocument = Students & Document;

@Schema({timestamps:true})
export class Students {
  @Prop({ required: true, type: mongooseSchema.Types.Number, unique:true })
  _id: Number;
  @Prop({ required: true, type: mongooseSchema.Types.String })
  name: string;
}

export const StudentsSchema = SchemaFactory.createForClass(Students);

