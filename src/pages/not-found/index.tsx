import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center text-center">
      <p className="text-sm">The page you are looking for was not found</p>
      <p className="text-sm">
        But you can{" "}
        <Link to="/sign-n" className="underline text-sky-500">
          login
        </Link>
        to continue to the dashboard.
      </p>
    </div>
  );
};

export default NotFoundPage;
