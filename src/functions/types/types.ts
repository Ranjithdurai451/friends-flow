export type newUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
};
export type login = {
  email: string;
  password: string;
};
export type appwritePostType = {
  id: string;
  caption: string;
  location: string;
  image: File[];
  tags: string;
};

export type appwriteUpdatePostType = {
  postId: string;
  userId: string;
  caption: string;
  location: string;
  image: File[];
  tags: string;
  imageId: string;
  imageUrl: string;
};

export type ConfirmPasswordType = {
  newPassword: string;
  RepeatednewPassword: string;
};

export type NewPostType = {
  caption: string;
  location: string;
  tags: string;
};

export type updateUserType = {
  name: string;
  username: string;
  bio: string;
};

export type appupdateUserType = {
  name: string;
  username: string;
  bio: string;
  image: File[];
  id: string;
  imageId: string;
};
export type updateEmailType = {
  email: string;
  password: string;
};
