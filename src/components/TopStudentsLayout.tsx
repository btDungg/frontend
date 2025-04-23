import { Link, Outlet, useParams } from 'react-router-dom';

const TopStudentsLayout = () => {
  const { group } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="topstudent">
        <Link 
          to="../reports/group-a"
          className={` ${
            group === 'group-a'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          Khối A
        </Link>
        <Link
          to="../reports/group-b"
          className={`${
            group === 'group-b'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          Khối B
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default TopStudentsLayout;
