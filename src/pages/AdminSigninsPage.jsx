import React, { useEffect, useState } from 'react';
import { databases } from '../appwriteConfig';
import { Query } from 'appwrite';

export default function AdminSigninsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await databases.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_COLLECTION_ID, [
        Query.orderDesc('lastLogin'),
      ]);
      setLogs(res.documents);
    };
    fetchLogs();
  }, []);

  return (
    <div className="container">
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Login History for Admin</h1>
      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border border-gray-300 text-center">Email</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Count</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Last Login</th>
              <th className="py-2 px-4 border border-gray-300 text-center">IP</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Admin</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((doc) => (
              <tr key={doc.$id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-300 text-center">{doc.email}</td>
                <td className="py-2 px-4 border border-gray-300 text-center">{doc.count}</td>
                <td className="py-2 px-4 border border-gray-300 text-center">{new Date(doc.lastLogin).toLocaleString()}</td>
                <td className="py-2 px-4 border border-gray-300 text-center">{doc.ip}</td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  <span className={`font-semibold ${doc.admin ? 'text-green-600' : 'text-red-500'}`}>
                    {doc.admin ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
// import React, { useEffect, useState } from 'react';
// import { databases } from '../appwriteConfig';
// import { Query } from 'appwrite';

// export default function AdminSigninsPage() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       const res = await databases.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_COLLECTION_ID, [
//         Query.orderDesc('lastLogin'),
//       ]);
//       setLogs(res.documents);
//     };
//     fetchLogs();
//   }, []);

//   return (
//     <div>
//       <h1>Login History for Admin</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Email</th><th>Count</th><th>Last</th><th>IP</th><th>Admin?</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map(doc => (
//             <tr key={doc.$id}>
//               <td>{doc.email}</td>
//               <td>{doc.count}</td>
//               <td>{new Date(doc.lastLogin).toLocaleString()}</td>
//               <td>{doc.ip}</td>
//               <td>{doc.admin ? 'Yes' : 'No'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
