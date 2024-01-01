import { useEffect, useState } from 'react';
import { account, avatars } from '../../functions/appwrite/config';
import { isEmailAvailable, saveUserToDB } from '../../functions/appwrite/api';
import { Navigate } from 'react-router-dom';
import Loader from '../../ui/Loader';

const OAuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function sign() {
      try {
        const user = await account.get();
        if (!user) setIsLoading(false);
        else {
          const profileUrl = avatars.getInitials(user.name);
          if ((await isEmailAvailable(user.email)) == false) {
            saveUserToDB({
              id: user.$id,
              name: user.name,
              email: user.email,
              username: '',
              profileUrl: profileUrl,
            });
          }
          console.log('hello');
          const token = await account.createJWT();
          window.localStorage.setItem(
            'cookieFallback',
            JSON.stringify(token.jwt)
          );
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    sign();
  }, []);
  return <div className="">{isLoading ? <Loader /> : <Navigate to="/" />}</div>;
};

export default OAuthPage;
