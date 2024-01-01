import {
  Query,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  UpdateUserData,
  createAccount,
  createComment,
  createPost,
  deleteComment,
  deletePost,
  deleteSavedPost,
  followUser,
  getCurrentUser,
  getPopularPosts,
  getPostById,
  getRecentPosts,
  getRecentUsers,
  getUser,
  likePost,
  savePost,
  searchPosts,
  searchUsers,
  signInAccount,
  signOutAccount,
  signinWithGoogle,
  unFollowUser,
  updateComment,
  updatePost,
} from '../appwrite/api';
import {
  appupdateUserType,
  appwritePostType,
  appwriteUpdatePostType,
  newUser,
} from '../types/types';
import { queryClient } from '../store';

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (user: newUser) => createAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: signinWithGoogle,
  });
};

export const useCreateNewPost = () => {
  return useMutation({
    mutationFn: (data: appwritePostType) => {
      return createPost(data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getRecentPosts(pageParam),
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage);
      if (!lastPage) return null;
      if (!lastPage.documents || lastPage.documents.length === 0) return null;

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      const lastId = lastDocument?.$id || null;

      return { pageparam: lastId };
    },
    initialPageParam: { pageparam: null },
  });
};
export const useSearchUsers = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['users', query],
    enabled: !!query,
    queryFn: ({ pageParam }) =>
      searchUsers({
        query: query,
        pageparam: pageParam.pageparam,
      }),
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage);
      if (!lastPage) return null;
      if (!lastPage.documents || lastPage.documents.length === 0) return null;

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      const lastId = lastDocument?.$id || null;

      return { pageparam: lastId };
    },
    initialPageParam: { pageparam: null },
  });
};
export const useGetAllUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => getRecentUsers(pageParam),
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage);
      if (!lastPage) return null;
      if (!lastPage.documents || lastPage.documents.length === 0) return null;

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      const lastId = lastDocument?.$id || null;

      return { pageparam: lastId };
    },
    initialPageParam: { pageparam: null },
  });
};

export const useGetCurrentUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
};

export const useCreateNewComment = (id: string, currentUser: any) => {
  return useMutation({
    mutationFn: ({
      userId,
      postId,
      comment,
      id,
    }: {
      userId: string;
      postId: string;
      comment: string;
      id: string;
    }) => {
      return createComment({ userId, postId, comment, id });
    },
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ['posts', id] });
      const previousData: any = queryClient.getQueryData(['posts', id]);
      queryClient.setQueryData(['posts', id], () => {
        return {
          ...previousData,
          comments: [
            ...previousData?.comments,
            {
              $id: id,
              comment: data.comment,
              user: { ...currentUser },
              $createdAt: new Date(),
              $updatedAt: new Date(),
            },
          ],
        };
      });
      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      queryClient.setQueryData(['posts', id], () => {
        return { ...context?.previousData };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = (id: string) => {
  return useMutation({
    mutationKey: ['posts', id],
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ['posts', id] });
      queryClient.removeQueries({ queryKey: ['posts', id] });
    },
  });
};

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostById(id ?? ''),
    enabled: !!id,
  });
};

export const useUpdatePost = (id: string) => {
  return useMutation({
    mutationFn: (data: appwriteUpdatePostType) => {
      return updatePost(data);
    },
    onMutate: async (data: any) => {
      queryClient.cancelQueries({ queryKey: ['posts', id] });
      var previousPost: any = queryClient.getQueryData(['posts']);
      var previousPostById: any = queryClient.getQueryData(['posts', id]);
      var newPages = previousPost?.pages.map((page: any) => {
        return {
          ...page,
          documents: page.documents.map((doc: any) => {
            if (doc.$id === id) {
              return {
                ...doc,
                caption: data?.caption,
                location: data?.location,
                tags: data?.tags?.split(','),
              };
            }
            return doc;
          }),
        };
      });

      queryClient.setQueryData(['posts'], () => {
        return {
          pageParams: previousPost?.pageParams,
          pages: newPages,
        };
      });
      queryClient.setQueryData(['posts', id], () => {
        return {
          ...previousPostById,
          caption: data?.caption,
          location: data?.location,
          tags: data?.tags?.split(','),
        };
      });
      return { previousPost, previousPostById };
    },
    onError(error, variables, context: any) {
      queryClient.setQueryData(['posts'], context?.previousPost);
      queryClient.setQueryData(['posts', id], context?.previousPostById);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
    },
  });
};

export const useDeleteComment = (postId: string) => {
  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) => {
      return deleteComment(commentId);
    },
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ['posts', postId] });
      const previousData: any = queryClient.getQueryData(['posts', postId]);
      queryClient.setQueryData(['posts', postId], () => {
        return {
          ...previousData,
          comments: previousData?.comments.filter(
            (comment: any) => comment.$id !== data.commentId
          ),
        };
      });
      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      queryClient.setQueryData(['posts', postId], () => {
        return { ...context?.previousData };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdateComment = (postId: string) => {
  return useMutation({
    mutationFn: ({
      commentId,
      comment,
    }: {
      commentId: string;
      comment: string;
    }) => {
      return updateComment(commentId, comment);
    },
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ['posts', postId] });
      const previousData: any = queryClient.getQueryData(['posts', postId]);
      queryClient.setQueryData(['posts', postId], () => {
        return {
          ...previousData,
          comments: previousData?.comments.map((comment: any) => {
            if (comment.$id === data.commentId) {
              return {
                ...comment,
                $updatedAt: new Date(),
                comment: data.comment,
              };
            }
            return comment;
          }),
        };
      });
      return { previousData };
    },
    onError(error, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      queryClient.setQueryData(['posts', postId], () => {
        return { ...context?.previousData };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });
};

export const useLikePost = (postId: string) => {
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => {
      return likePost(postId, likesArray);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onMutate: (data: any) => {
      queryClient.cancelQueries({ queryKey: ['posts'] });
      var previousPost: any = queryClient.getQueryData(['posts']);
      // queryClient.setQueryData(['posts'], () => {
      //   const newDocuments = previousPost.pages.map((page: any) =>
      //     page.documents.map((doc: any) => {
      //       if (doc.$id === data.postId) {
      //         return { ...doc, likes: data.likesArray };
      //       }
      //       return doc;
      //     })
      //   );
      //   return {
      //     total: previousPost.total,
      //     documents: newDocuments,
      //   };
      // });
      var newPages = previousPost?.pages.map((page: any) => {
        return {
          ...page,
          documents: page.documents.map((doc: any) => {
            if (doc.$id === data.postId) {
              return { ...doc, likes: data.likesArray };
            }
            return doc;
          }),
        };
      });

      queryClient.setQueryData(['posts'], () => {
        return {
          pageParams: previousPost?.pageParams,
          pages: newPages,
        };
      });

      return { previousPost };
    },
    onError(error, variables, context: any) {
      console.log(context);
      queryClient.setQueryData(['posts'], context.previousPost);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useSavePost = (postId: string, post: any) => {
  return useMutation({
    mutationFn: ({
      postId,
      userId,
      id,
    }: {
      postId: string;
      userId: string;
      id: string;
    }) => {
      return savePost(postId, userId, id);
    },
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ['user'] });
      var previousUser: any = queryClient.getQueryData(['user']);
      queryClient.setQueryData(['user'], () => {
        return {
          ...previousUser,
          saves: [...previousUser?.saves, { posts: post, $id: data.id }],
        };
      });
      return { previousUser };
    },
    onError(error, variables, context: any) {
      queryClient.setQueryData(['user'], context?.previousUser);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['posts', post.$id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['posts', post.$id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
export const useDeleteSavedPost = (postId: string, post: any) => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      return deleteSavedPost(postId);
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['user'] });
      var previousUser: any = queryClient.getQueryData(['user']);
      queryClient.setQueryData(['user'], () => {
        return {
          ...previousUser,
          saves: previousUser.saves.filter(
            (save: any) => save.posts.$id !== post.$id
          ),
        };
      });
      return { previousUser };
    },
    onError(error, variables, context: any) {
      queryClient.setQueryData(['user'], context.previousUser);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['posts', post.$id] });
      // queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['posts', post.$id] });
      // queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useSearchPosts = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['posts', query],
    enabled: !!query,
    queryFn: ({ pageParam }) => searchPosts(query, pageParam.pageparam),
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage);
      if (!lastPage) return null;
      if (!lastPage.documents || lastPage.documents.length === 0) return null;

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      const lastId = lastDocument?.$id || null;

      return { pageparam: lastId };
    },
    initialPageParam: { pageparam: null },
  });
};

export const useGetPopularPosts = () => {
  return useInfiniteQuery({
    queryKey: ['popular-posts'],
    queryFn: ({ pageParam }) => getPopularPosts(pageParam),
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage);
      if (!lastPage) return null;
      if (!lastPage.documents || lastPage.documents.length === 0) return null;

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      const lastId = lastDocument?.$id || null;

      return { pageparam: lastId };
    },
    initialPageParam: { pageparam: null },
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getUser({ id }),
    enabled: !!id,
  });
};

export const useFollowUser = () => {
  return useMutation({
    mutationFn: ({
      followerId,
      userId,
    }: {
      followerId: string;
      userId: string;
    }) => {
      return followUser({ followerId, userId });
    },
  });
};

export const useUnFollowUser = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return unFollowUser({ id });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: appupdateUserType) => {
      return UpdateUserData(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [data?.id] });
    },
  });
};
