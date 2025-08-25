import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function MemberDetails() {
  const { memberId } = useParams();
  const navi = useNavigate();
  const [memberDetail, setMemberDetail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // reset state whenever URL param changes
    setError("");
    setMemberDetail(null);
    if (!memberId) return;
    fetchMemberDetails(memberId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  async function fetchMemberDetails(id) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navi('/');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized or session expired");
        localStorage.removeItem("authToken");
        navi('/');
        return;
      }
      if (res.status === 404) {
        setError("Member not found");
        return;
      }
      if (!res.ok) {
        setError("Failed to fetch member details");
        return;
      }
      const detail = await res.json();
      setMemberDetail(detail);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleRetry() {
    if (memberId) fetchMemberDetails(memberId);
  }
  function backToList() {
    navi('/member');
  }

  if (loading && !memberDetail) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  if (error) {
    return (
      <div className="mt-6 flex flex-col items-center space-y-4">
        <p className="text-red-600">{error}</p>
        <div className="space-x-3">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >Retry</button>
          <button
            onClick={backToList}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >Back to Members</button>
        </div>
      </div>
    );
  }

  if (!memberDetail) return null;

  return (
  <div className="flex justify-center items-start bg-white p-6">
    <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <div className="flex flex-col items-center text-center">
        {/* Avatar circle */}
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {memberDetail.member_name.charAt(0)}
        </div>

        {/* Name */}
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {memberDetail.member_name}
        </h2>

        {/* Job */}
        <p className="text-sm text-gray-500">{memberDetail.job}</p>
      </div>

      <div className="mt-6 space-y-3 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Phone</span>
          <span>{memberDetail.phone_number}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Hobby</span>
          <span>{memberDetail.hobby}</span>
        </div>
      </div>
    </div>
  </div>
);

}