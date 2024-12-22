import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Name, NameSchema } from './name.schema';

@Schema({ collection: 'users' })
export class User {
  @Virtual({
    get: function (this: User): string {
      return `${this.name.firstName} ${this.name.lastName}`;
    },
  })
  fullName: string;

  @Prop(NameSchema)
  name: Name;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserDocumentOverride {
  name: Types.Subdocument<Name & Types.ObjectId>;
}

export type UserDocument = HydratedDocument<User & UserDocumentOverride>;
