
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export default function Table() {
  // retrieving admin email from the store 
  const { email } = useSelector(state => state.userDetail);
  let emailChange = "kyle.boudville@gmail.com"
  // having a useState to retrieve the data from the useEffect 
  const [memberData, setMemberData] = useState([]);

  // using a get request 
  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch(`http://localhost:5000/api/members?email=${email}`);
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
  },[email])

  console.log("Usestate ", memberData);


  return (
    <>
      <Header buttonName="Forms" />
      <ul>
        {memberData.map(member => (
          <li >{member.member_name}</li>
        ))}
      </ul>
    </>
  )
}