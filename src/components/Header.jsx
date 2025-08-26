import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileImage } from '../data/profileImage';
export default function Header({ buttonName }) {
  // useState for profile image 
  const [avatarSrc, setAvatarSrc] = useState(()=>localStorage.getItem('avatarUrl')||"");
  const [loading, setLoading] = useState(false);
  const { username, email } = useSelector(state => state.userDetail);
  const navi = useNavigate();
  const classButton = "bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition"
  
  // useEffect to mount the API and not run it in an infinite loop 
  useEffect(() => {
    if (avatarSrc) return; //already have in local storage
    let current = true 
    async function loadImage() {
      setLoading(true)
      try {
        const url = await profileImage();
        if (current) {
          setAvatarSrc(url)
          localStorage.setItem('avatarUrl', url)
        }
      }
      catch (e) {
        console.error("avatar loaded failed ", e);
      } finally {
        if (current) setLoading(false)
      }
    }
    loadImage();
    return () => { current = false };
  }, []);

  // Chaning profile picture if i press on the pic 
  function handleChangePicture(){ 
    let current= true;
    async function loadImage() {
      setLoading(true)
      try {
        const url = await profileImage();
        if (current) {
          setAvatarSrc(url)
          localStorage.setItem('avatarUrl', url)
        }
      }
      catch (e) {
        console.error("avatar loaded failed ", e);
      } finally {
        if (current) setLoading(false)
      }
    }
    loadImage();
  }

  // function for user to navigate to the table pages to view the forms they filled up
  function handleNavPage() {
    if (buttonName === "Members") {
      navi('/member')
    }
    else {
      navi('/form')
    }
  }
  function handleLogout() {
    navi('/');
    setAvatarSrc("");
    localStorage.clear();
  }

  return (
    <header className="bg-stone-500 p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          {loading ? <p>loading...</p> :
            <img
              src={avatarSrc}
              className="w-20 h-20 rounded-full ring-2 ring-white object-cover hover:cursor-pointer"
              draggable="false"
              onClick={handleChangePicture}
            />}
          <div>
            <h1 className="text-3xl font-bold text-white tracking-wide">
              Welcome {username && <span>{username} !</span>}
            </h1>
            {email && <p className="text-white text-sm">{email}</p>}
          </div>
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
