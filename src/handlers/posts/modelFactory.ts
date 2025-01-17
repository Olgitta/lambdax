import { DataTypes, Model } from 'sequelize';
import { initializeDatabase } from '../../infra-mysql/connection';
import { IPostAttributes, IPostCreationAttributes } from './definitions';

let initialized = false;

class PostModel
  extends Model<IPostAttributes, IPostCreationAttributes>
  implements IPostAttributes
{
  public id!: number;
  public userId!: number;
  public title!: string;
  public content!: string;
  public likes!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export async function initializePostModel(): Promise<typeof PostModel> {
  if (initialized) {
    return PostModel;
  }
  const sequelize = await initializeDatabase();
  PostModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      tableName: 'posts',
      timestamps: true,
    },
  );

  initialized = true;
  return PostModel;
}
