import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Member() {
  const navi = useNavigate();
  // retrieving admin email from the store not needed any more because JWT token stores the email
  const { email } = useSelector(state => state.userDetail);
  // let emailChange = "kyle.boudville@gmail.com"
  // having a useState to retrieve the data from the useEffect 
  const [memberData, setMemberData] = useState([]);

  // using a get request 
  useEffect(() => {
    async function fetchMembers() {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`http://localhost:5000/api/members`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.status === 401 || res.status === 403) {
        console.warn("Unauthorized/Expired Token");
        localStorage.removeItem("authToken");
        return;
      }
        if (!res.ok) {
          throw new Error('Failed to fetch members name')
        }
        const names = await res.json();
        setMemberData(names)
        console.log("Fetched members from da function  : ", names);
      } catch (err) {
        console.error("Frontend Error : ", err.message);
      }
    }
    if (email) fetchMembers();
  }, [email,navi])

  console.log("Usestate ", memberData);


  return (
    <>
      <Header buttonName="Forms" />
      <ul className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto space-y-3">
        {memberData.map((member) => (
          <li
            key={member.member_id}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <span className="font-medium text-gray-800">{member.member_name}</span>
            <Link
              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
              to={`/member/${member.member_id}`}>
              View details
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>

  )
}