const DeleteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      fill="none"
      className={className}
      viewBox="0 0 64 64"
    >
      <path
        className={className}
        d="M29 13.5a1.5 1.5 0 000 3h6a1.5 1.5 0 000-3h-6zM14.5 19a1.5 1.5 0 011.5-1.5h32a1.5 1.5 0 010 3H16a1.5 1.5 0 01-1.5-1.5zM17.5 22v22a6.5 6.5 0 006.5 6.5h16a6.5 6.5 0 006.5-6.5V22h-3v22a3.5 3.5 0 01-3.5 3.5H24a3.5 3.5 0 01-3.5-3.5V22h-3z"
      ></path>
      <path
        className={className}
        d="M36 28.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-3 0v-9a1.5 1.5 0 011.5-1.5zM29.5 30a1.5 1.5 0 00-3 0v9a1.5 1.5 0 003 0v-9z"
      ></path>
    </svg>
  );
};

export default DeleteIcon;
