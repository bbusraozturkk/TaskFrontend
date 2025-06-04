import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

function RemarkList() {
  const { revisionId } = useParams(); //urlden gelen parametre
  const [remarks, setRemarks] = useState([]); //apiden gelen yorum verilerini tutar

 // Sayfa yüklendiğinde backendden GET /api/remarks/:revisionId çağrılır
  useEffect(() => {
    api.get(`/remarks/${revisionId}`)
      .then(res => setRemarks(res.data))
      .catch(err => console.error('Notlar alınamadı:', err));
  }, [revisionId]); //Gelen yorumlar setRemarks ile state'e yazılır

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Notlar</h2>
      {remarks.length === 0 ? (
        <p>Henüz not eklenmemiş.</p>
      ) : (
        <table border="1" cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Rol</th>
              <th>Not</th>
              <th>Ekleyen</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {remarks.map(remark => (
              <tr key={remark._id}>
                <td>{remark.role}</td>
                <td>{remark.text}</td>
                <td>{remark.createdBy}</td>
                <td>{new Date(remark.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RemarkList;
