import { useSelector } from 'react-redux';
import Button from '../components/Button';

export default function Header() {
  const { username, email } = useSelector(state => state.userDetail);

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Welcome {username && <span>{username}</span>}
          </h1>
          {email && <p className="text-white text-sm">{email}</p>}
        </div>
        <Button className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition">
          Tables
        </Button>
      </div>
    </header>
  );
}
