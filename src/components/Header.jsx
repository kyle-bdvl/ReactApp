import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
export default function Header({ buttonName }) {
  const { username, email } = useSelector(state => state.userDetail);
  const navi = useNavigate();
  const classButton = "bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition"
  // function for user to navigate to the table pages to view the forms they filled up
  function handleNavPage() {
    if (buttonName === "Members") {
      navi('/table')
    }
    else {
      navi('/form')
    }
  }
  function handleLogout() {
    navi('/')
    localStorage.clear()
    
  }

  return (
    <header className="bg-stone-500 p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Welcome {username && <span>{username} !</span>}
          </h1>
          {email && <p className="text-white text-sm">{email}</p>}
        </div>
        <div className='flex items-center justify-between gap-x-2.5'>
          <Button onClick={handleNavPage} className={classButton}>
            {buttonName}
          </Button>
          <Button onClick={handleLogout} className={classButton}>
            Logout
          </Button>
        </div>

      </div>
    </header>
  );
}
