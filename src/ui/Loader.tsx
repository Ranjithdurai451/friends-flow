const Loader = () => {
  return (
    <div className="h-screen bg-black w-screen   flex justify-center items-center">
      <div className="wrapper">
        <div className="circle "></div>
        <div className="circle "></div>
        <div className="circle "></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default Loader;

export const Loader2 = () => {
  return (
    <div className="h-full w-full  flex justify-center items-center">
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  );
};
