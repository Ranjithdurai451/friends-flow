import {
  appupdateUserType,
  appwritePostType,
  appwriteUpdatePostType,
  newUser,
} from '../types/types';
import { account, appwriteConfig, avatars, databases, storage } from './config';
import { ID, Query } from 'appwrite';

export async function createAccount(user: newUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw new Error();
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      id: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      profileUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export async function saveUserToDB(user: {
  id: string;
  email: string;
  name: string;
  profileUrl: URL;
  username: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    if (!newUser) throw new Error();

    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    if (!session) {
      throw new Error();
    }
    return session;
  } catch (err) {
    console.log(err);
  }
}
export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    if (!session) {
      throw new Error();
    }
    return session;
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateUserData(data: appupdateUserType) {
  const fileStatus = data.image.length > 0;
  try {
    if (fileStatus) {
      if (data.imageId) {
        await deleteFile(data.imageId);
      }

      const uploadedFile = await uploadFile(data.image[0]);
      if (!uploadedFile) throw new Error();
      const imageUrl = await getFilePreview(uploadedFile.$id);

      if (!imageUrl) {
        deleteFile(uploadedFile.$id);
        throw new Error();
      }
      //  console.log('completed');

      const updatedBio = data.bio.split(',') || [];
      const UpdatedData = {
        name: data.name,
        username: data.username,
        bio: updatedBio,
        profileUrl: imageUrl,
        profileId: uploadedFile.$id,
      };

      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        data.id,
        UpdatedData
      );
      return updatedUser;
    } else {
      const updatedBio = data.bio.split(',') || [];
      const UpdatedData = {
        name: data.name,
        username: data.username,
        bio: updatedBio,
      };

      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        data.id,
        UpdatedData
      );
      return updatedUser;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('id', currentAccount.$id)]
    );
    if (!currentUser) throw new Error();
    // console.log(currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function isEmailAvailable(email: string) {
  try {
    const isEmail = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('email', email)]
    );
    if (!isEmail.documents[0]) throw new Error();
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

export async function signinWithGoogle() {
  try {
    const session = account.createOAuth2Session(
      'google',
      'http://localhost:5173/auth',
      'http://localhost:5173'
    );
    return session;
  } catch (error) {
    console.log(error);
  }
}
export async function createPost(post: appwritePostType) {
  try {
    const uploadedFile = await uploadFile(post.image[0]);
    if (!uploadedFile) throw new Error();
    const imageUrl = await getFilePreview(uploadedFile.$id);
    if (!imageUrl) {
      deleteFile(uploadedFile.$id);
      throw new Error();
    }
    const formattedTags = post.tags.split(',') || [];

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.id,
        caption: post.caption,
        location: post.location,
        imageUrl,
        imageId: uploadedFile.$id,
        tags: formattedTags,
      }
    );
    if (!newPost) {
      deleteFile(uploadedFile.$id);
      throw new Error();
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    if (!uploadedFile) throw new Error();

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export async function getFilePreview(id: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      id,
      300,
      300,
      'top',
      5
    );
    if (!fileUrl) throw new Error();

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(id: string) {
  try {
    console.log(id);
    await storage.deleteFile(appwriteConfig.storageId, id);
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts({
  pageparam,
}: {
  pageparam: number | null;
}) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(12)];
    if (pageparam) {
      queries.push(Query.cursorAfter(pageparam.toString()));
    }
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );
    if (!posts) throw new Error();
    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function getRecentUsers({
  pageparam,
}: {
  pageparam: number | null;
}) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [Query.orderAsc('$createdAt'), Query.limit(12)];
    if (pageparam) {
      queries.push(Query.cursorAfter(pageparam.toString()));
    }
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    );
    if (!users) throw new Error();
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!updatedPost) throw new Error();
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postId: string, userId: string, id: string) {
  try {
    const savePost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      id,
      {
        posts: postId,
        user: userId,
      }
    );
    if (!savePost) throw new Error();
    return savePost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(postId: string) {
  try {
    const deletedPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      postId
    );
    if (!deletedPost) throw new Error();
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

export async function followUser({
  followerId,
  userId,
  key,
}: {
  followerId: string;
  userId: string;
  key: string;
}) {
  try {
    // console.log(key);
    const followUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followersCollectionId,
      key,
      {
        userfollow: followerId,
        user: userId,
      }
    );
    if (!followUser) throw new Error();
    // console.log(followUser);
    return followUser;
  } catch (error) {
    console.log(error);
  }
}

export async function unFollowUser({ id }: { id: string }) {
  // console.log(id);
  try {
    const unfollowUser = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followersCollectionId,
      id
    );
    if (!unfollowUser) throw new Error();
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}
export async function getPostById(postId: string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );
    if (!post) throw new Error();
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: appwriteUpdatePostType) {
  const fileStatus = post.image.length > 0;
  try {
    if (fileStatus) {
      await deleteFile(post.imageId);
      const uploadedFile = await uploadFile(post.image[0]);
      if (!uploadedFile) throw new Error();
      const imageUrl = await getFilePreview(uploadedFile.$id);
      if (!imageUrl) {
        deleteFile(uploadedFile.$id);
        throw new Error();
      }
      console.log('completed');

      const formattedTags = post.tags.split(',') || [];

      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        post.postId,
        {
          caption: post.caption,
          location: post.location,
          imageUrl,
          imageId: uploadedFile.$id,
          tags: formattedTags,
        }
      );
      if (!updatedPost) {
        deleteFile(uploadedFile.$id);
        throw new Error();
      }

      return updatedPost;
    } else {
      const formattedTags = post.tags.split(',') || [];

      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        post.postId,
        {
          caption: post.caption,
          location: post.location,
          tags: formattedTags,
        }
      );
      if (!updatedPost) {
        deleteFile(post.imageId);
        throw new Error();
      }

      return updatedPost;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId: string, imageId: string) {
  try {
    await deleteFile(imageId);
    // console.log(postId);
    const deletedPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );
    if (!deletedPost) throw new Error();

    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

export async function createComment({
  id,
  postId,
  comment,
  userId,
}: {
  id: string;
  postId: string;
  comment: string;
  userId: string;
}) {
  try {
    const newComment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      id,
      {
        post: postId,
        comment,
        user: userId,
      }
    );
    if (!newComment) throw new Error();
    return newComment;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      commentId
    );
    if (!response) throw new Error();
    return { status: 'success' };
  } catch (error) {
    console.log(error);
  }
}

export async function updateComment(commentId: string, comment: string) {
  try {
    const updatedComment = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      commentId,
      {
        comment,
      }
    );
    if (!updatedComment) throw new Error();
    return updatedComment;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(query: string, pageparam?: number) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [Query.search('caption', query), Query.limit(2)];
    if (pageparam) {
      queries.push(Query.cursorAfter(pageparam?.toString()));
    }
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );
    if (!posts) throw new Error();
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchUsers({
  pageparam,
  query,
}: {
  pageparam: number;
  query: string;
}) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [Query.search('name', query), Query.limit(12)];
    if (pageparam) {
      queries.push(Query.cursorAfter(pageparam?.toString()));
    }
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    );
    if (!users) throw new Error();
    return users;
  } catch (error) {
    console.log(error);
  }
}
export async function getPopularPosts({
  pageparam,
}: {
  pageparam: number | null;
}) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [Query.orderDesc('$createdAt'), Query.limit(15)];
    if (pageparam) {
      queries.push(Query.cursorAfter(pageparam.toString()));
    }
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );
    if (!posts) throw new Error();
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser({ id }: { id: string }) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      id
    );
    if (!user) throw new Error();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function SuggestedUser() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.limit(6), Query.orderDesc('$createdAt')]
    );

    if (!users) throw new Error();

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function updateEmail({
  email,
  password,
  id,
}: {
  email: string;
  password: string;
  id: string;
}) {
  try {
    const response = await account.updateEmail(email, password);
    if (!response) throw new Error();
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      id,
      {
        email: email,
      }
    );
    if (!updatedUser) throw new Error();
    return response;
  } catch (error) {
    console.log(error);
  }
}
