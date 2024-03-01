import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import AuthLayout from './Layouts/_Auth/AuthLayout';
import SignupForm from './Layouts/_Auth/SignupForm';
import { SigninForm } from './Layouts/_Auth/SigninForm';
import RootLayout from './Layouts/_Root/RootLayout';
import Home from './Layouts/_Root/pages/Home';
import OAuthPage from './Layouts/_Auth/OAuthPage';
import ForgotPassword from './Layouts/_Auth/Password-Recovery/ForgotPassword';
import ConfirmPassoword from './Layouts/_Auth/Password-Recovery/ConfirmPassoword';
import Explore from './Layouts/_Root/pages/Explore';
import People from './Layouts/_Root/pages/People';
import Saved from './Layouts/_Root/pages/Saved';
import CreatePost from './Layouts/_Root/pages/CreatePost';
import UpdatePost from './Layouts/_Root/pages/UpdatePost';
import PostDetail from './Layouts/_Root/pages/PostDetail';
import Comment from './Layouts/_Root/Components/Comment';
import Profile from './Layouts/_Root/pages/Profile';
import UpdateUser from './Layouts/_Root/pages/UpdateUser';
import ChangeEmail from './Layouts/_Root/pages/ChangeEmail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <Navigate to="/signup"></Navigate>,
      },
      {
        path: '/signup',
        element: <SignupForm />,
      },
      {
        path: '/signin',
        element: <SigninForm />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/confirm-password',
        element: <ConfirmPassoword />,
      },
    ],
  },
  {
    path: '/auth',
    element: <OAuthPage />,
  },

  {
    path: '/in',
    element: <RootLayout />,
    children: [
      {
        path: '/in',
        element: <Home></Home>,
        children: [
          {
            path: '/in/comments/:id',
            element: <Comment />,
          },
        ],
      },
      {
        path: '/in/explore',
        element: <Explore />,
      },
      {
        path: '/in/people',
        element: <People />,
      },
      {
        path: '/in/saved',
        element: <Saved />,
      },
      {
        path: '/in/create-post',
        element: <CreatePost />,
      },
      {
        path: '/in/update-post/:id',
        element: <UpdatePost />,
      },
      {
        path: '/in/post-detail/:id',
        element: <PostDetail />,
      },
      {
        path: '/in/profile/:id',
        element: <Profile />,
      },
      {
        path: '/in/update-profile/:id',
        element: <UpdateUser />,
      },
      {
        path: '/in/change-email/:id',
        element: <ChangeEmail />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
