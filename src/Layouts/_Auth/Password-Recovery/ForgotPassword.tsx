import React, { useRef, useState } from 'react';
import { account } from '../../../functions/appwrite/config';
import { Link, redirect } from 'react-router-dom';

const ForgotPassword = () => {
  const email = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  async function submitHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (
      email.current?.value.trim() === '' ||
      !email.current?.value.includes('@')
    ) {
      setErrorMsg('invalid email address');
    }
    try {
      if (email.current?.value) {
        var promise = await account.createRecovery(
          email.current.value,
          `${import.meta.env.VITE_APPWRITE_CLIENT_URL}/confirm-password`
        );
        if (!promise) throw new Error();
        setMessage(true);
      }
    } catch (error) {
      setErrorMsg('invalid email address');
      console.log(error);
      redirect('/');
    }
  }
  return (
    <form className="flex flex-col items-end gap-3 p-3 bg-white rounded-lg sm:p-5">
      <h1 className="w-full text-lg font-bold text-left">
        Forgot your password?
      </h1>
      <p className="text-[15px] font-light">
        Enter your email below and we'll send you a link to reset your password
      </p>
      <div className=" flex h-[45px]    w-full mb-2">
        <input
          ref={email}
          type="text"
          placeholder="Enter your email"
          className="rounded bg-gray-100 w-full h-full px-3 placeholder:text-xs placeholder:text-gray-600 focus-within:border-[1px] focus-within:border-solid focus-within:border-black"
        />
      </div>
      <button
        type="submit"
        onClick={(e) => submitHandler(e)}
        className="w-full px-3 py-3 text-white bg-orange-500 rounded "
      >
        Send
      </button>
      {message && (
        <p className="text-[12px] text-green-600">
          Message has been sent to your email successfully
        </p>
      )}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <hr className="w-full h-[1px] bg-black bg-opacity-40" />
      <div className="flex items-center justify-between w-full p-2">
        <p>Remember your password?</p>
        <Link
          to="/signin"
          className="text-black border-[1px] border-solid border-gray-500 rounded px-5 py-2 curs"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
