import { Optional } from 'sequelize';

export interface IPostRequestBody {
  title: string;
  content: string;
}

export interface IPostCreatePayload {
  userId: number;
  title: string;
  content: string;
}

export interface IPostAttributes {
  id: number;
  userId: number;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostCreationAttributes
  extends Optional<
    PostAttributes,
    'id' | 'likes' | 'createdAt' | 'updatedAt'
  > {}
