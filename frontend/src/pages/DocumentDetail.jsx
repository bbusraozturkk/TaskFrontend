import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function DocumentDetail() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [revisions, setRevisions] = useState([]);
  const navigate = useNavigate();

  //Sayfa yüklendiğinde veya id değiştiğinde API çağrısı yapılır.Gelen yanıttan document ve revisions ayrıştırılıp statelere yerleştirilir.
  useEffect(() => {
    api.get(`/documents/${id}`)
      .then(res => {
        setDocument(res.data.document);
        setRevisions(res.data.revisions);
      })
      .catch(err => console.error('Detay alınamadı:', err));
  }, [id]);

  if (!document) return <Typography sx={{ p: 4 }}>Yükleniyor...</Typography>;

  return (
       //Dökümana ait bilgiler kullanıcıya gösterilir
    <Box sx={{ padding: '10rem', marginLeft: "524px" }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>Döküman Detayı</Typography>
      <Paper sx={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <Typography><strong>Proje Kodu:</strong> {document.projectCode}</Typography>
        <Typography><strong>Tip:</strong> {document.type}</Typography>
        <Typography><strong>Döküman No:</strong> {document.documentNo}</Typography>
        <Typography><strong>Konu:</strong> {document.title}</Typography>
        <Typography><strong>Revizyon:</strong> {document.currentRevision}</Typography>
        <Typography><strong>Onay Durumu:</strong> {document.approvalStatus}</Typography>
        <Typography><strong>Açıklama:</strong> {document.description}</Typography>
        <Typography><strong>Oluşturan:</strong> {document.createdBy}</Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>Revizyonlar</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(`/revisions/${id}/new`)}>
          Yeni Revizyon Ekle
        </Button>
      </Box>

      {revisions.length === 0 ? (
        <Typography>Henüz revizyon eklenmemiş.</Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Revizyon No</strong></TableCell>
                <TableCell><strong>Dosya</strong></TableCell>
                <TableCell><strong>Yükleyen</strong></TableCell>
                <TableCell><strong>Notlar</strong></TableCell>
                <TableCell><strong>Yükleme Tarihi</strong></TableCell>
                <TableCell><strong>Notlar</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {revisions.map(rev => (
                <TableRow key={rev._id}>
                  <TableCell>{rev.revisionNo}</TableCell>
                  <TableCell>
                  <a
  href={`http://localhost:5000/${rev.filePath}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none' }}
>
  <Button variant="outlined" size="small">Görüntüle</Button>
</a>
                  </TableCell>
                  <TableCell>{rev.uploadedBy}</TableCell>
                  <TableCell>{rev.notes}</TableCell>
                  <TableCell>{new Date(rev.uploadedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="warning"
                      component={Link}
                      to={`/notlar/${rev._id}`}
                      size="small"
                    >
                      Notlar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}

export default DocumentDetail;
