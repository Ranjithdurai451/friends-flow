import React, { useRef, useState } from 'react';
import { account } from '../../../functions/appwrite/config';
import { Link, redirect } from 'react-router-dom';

const ForgotPassword = () => {
  const email = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState(false);
  async function submitHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (email.current?.value.trim() === '') return;
    try {
      if (email.current?.value) {
        var promise = await account.createRecovery(
          email.current.value,
          'http://localhost:5173/confirm-password'
        );
        if (!promise) throw new Error();
        setMessage(true);
      }
    } catch (error) {
      console.log(error);
      redirect('/');
    }
  }
  return (
    <form className="bg-white flex flex-col sm:p-5 p-3  rounded-lg gap-3 items-end">
      <h1 className="font-bold text-lg text-left w-full">
        Forgot your password?
      </h1>
      <p className="text-[15px] font-light">
        Enter your email below and we'll send you a link to reset your password
      </p>
      <div className=" flex h-[45px]    w-full mb-2">
        <label
          htmlFor=""
          className="w-[30%]  h-full text-[14px] font-normal flex justify-center items-center"
        >
          Email :
        </label>
        <input
          ref={email}
          type="text"
          placeholder="Enter your email"
          className="rounded bg-gray-100 w-[70%] h-full px-3 placeholder:text-xs placeholder:text-gray-400 focus-within:border-[1px] focus-within:border-solid focus-within:border-black"
        />
      </div>
      <button
        type="submit"
        onClick={(e) => submitHandler(e)}
        className=" px-3 py-3 bg-orange-500 text-white rounded w-full "
      >
        Send
      </button>
      {message && (
        <p className="text-[12px] text-green-600">
          Message has been sent to your email successfully
        </p>
      )}

      <hr className="w-full h-[1px] bg-black bg-opacity-40" />
      <div className="w-full flex justify-between items-center p-2">
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
