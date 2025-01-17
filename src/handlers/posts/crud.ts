import { Model } from 'sequelize';

import { initializePostModel } from './modelFactory';
import { IPostCreatePayload } from './definitions';

export async function createPost(payload: IPostCreatePayload): Promise<Model> {
  const postModel = await initializePostModel();
  return await postModel.create(payload, { raw: false });
}

//
// export async function getPosts(
//   payload: IGetPostsPayload,
//   filter: IGetPostsFilter,
// ): Promise<{ posts: PostModel[]; total: number }> {
//   console.info('getPosts called with:', { payload, filter });
//
//   const { skip, limit } = payload;
//   const { count, rows: posts } = await PostModel.findAndCountAll({
//     where: filter,
//     offset: skip,
//     limit,
//     order: [['updatedAt', 'DESC']],
//   });
//
//   return {
//     posts,
//     total: count,
//   };
// }
//
// export async function getPostById(
//   filter: IPostFilter,
// ): Promise<PostModel | null> {
//   console.info('getPostById called with:', { filter });
//
//   return PostModel.findOne({
//     where: filter,
//   });
// }
//
// export async function updatePost(
//   payload: IUpdatePostPayload,
//   filter: IPostFilter,
// ): Promise<{ updated: number; post?: PostModel }> {
//   console.info('updatePost called with:', { payload, filter });
//
//   const [affectedRows] = await PostModel.update(payload, {
//     where: filter,
//   });
//
//   if (affectedRows === 0) {
//     return {
//       updated: 0,
//     };
//   }
//
//   const post = await PostModel.findByPk(filter.id!); // `id` is required in this context
//   return { updated: affectedRows, post };
// }
//
// export async function deletePost(filter: IPostFilter): Promise<number> {
//   console.info('deletePost called with:', { filter });
//
//   return PostModel.destroy({
//     where: filter,
//   });
// }
//
// export async function updateLikes(
//   payload: IUpdateLikesPayload,
//   filter: IPostFilter,
// ): Promise<number> {
//   console.info('updateLikes called with:', { payload, filter });
//
//   const { like } = payload;
//   const operation = like ? 'increment' : 'decrement';
//   const where = like
//     ? { ...filter }
//     : { ...filter, likes: { [Sequelize.Op.gt]: 0 } };
//
//   const [[_, affectedRows]] = await (PostModel as any)[operation]('likes', {
//     by: 1,
//     where: where,
//   });
//
//   return affectedRows;
// }
