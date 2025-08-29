import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../data/apiClient';
import Input from '../components/Input.jsx';
export default function Member() {
  const navi = useNavigate();

  const token = useSelector(state => state.authToken.accessToken)
  // having a useState to retrieve the data from the useEffect 
  const [memberData, setMemberData] = useState([]);

  // useState for two way binding 
  const [search, setSearch] = useState("");

  // using a get request 
  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await apiFetch(`http://localhost:5000/api/members`);
        if (res.status === 401 || res.status === 403) {
          console.warn("Unauthorized / Expired Token");
          navi('/');
          return;
        }

        if (!res.ok) {
          throw new Error('failed to fetch member name');
        }
        const names = await res.json();
        setMemberData(names);
      } catch (err) {
        console.error("frontend error: ", err.message);
      }
    }
    fetchMembers();
  }, [navi]);

  console.log("Usestate ", memberData);
  let filteredMembers = memberData.filter(member => member.member_name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Header buttonName="Forms" />

      <ul className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto space-y-3">
        <Input searchBar={true} type="text" value={search} onChange={(e) => setSearch(e.target.value)}></Input>
        {filteredMembers.length === 0 ? (<p>No members found </p>) :
          (filteredMembers.map((member) => (
            <li
              key={member.member_id}
              className="flex items-center justify-between p-3 mb-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="font-medium text-gray-800">{member.member_name}</span>
              <Link
                className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
                to={`/member/${member.member_id}`}>
                View details
              </Link>
            </li>
            )
          ))//end of ternary operator bracket
        }

      </ul>
      <Outlet />
    </>

  )
}