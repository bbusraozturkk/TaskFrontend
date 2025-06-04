import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider
} from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

function Summary() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    api.get('/documents')
      .then(res => setDocuments(res.data))
      .catch(err => console.error('Özet alınamadı:', err));
  }, []);

  const total = documents.length;
  const approved = documents.filter(doc => doc.approvalStatus === 'Onaylandı').length;
  const waiting = documents.filter(doc => doc.approvalStatus === 'Onayda').length;
  const rejected = documents.filter(doc => doc.approvalStatus === 'Reddedildi').length;

  const pieData = [
    { name: 'Onaylananlar', value: approved },
    { name: 'Bekleyenler', value: waiting },
    { name: 'Reddedilenler', value: rejected }
  ];

  const projectStats = documents.reduce((acc, doc) => {
    const project = doc.projectCode;
    if (!acc[project]) {
      acc[project] = { approved: 0, waiting: 0, rejected: 0, total: 0 };
    }
    if (doc.approvalStatus === 'Onayda') acc[project].waiting++;
    else if (doc.approvalStatus === 'Onaylandı') acc[project].approved++;
    else if (doc.approvalStatus === 'Reddedildi') acc[project].rejected++;
    acc[project].total++;
    return acc;
  }, {});

  return (
    <div style={{ padding: '10rem' }}>
      <Typography variant="h4" gutterBottom>Proje Özeti</Typography>

      <Grid container spacing={3}>
  <Grid item xs={12} md={8}>
    <Paper elevation={3} style={{ padding: '2rem', height: '100%' }}>
      <Typography variant="h6" align="center" gutterBottom>Durum Grafiği</Typography>
      <ResponsiveContainer width={500} height={400}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={160} 
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  </Grid>


        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>Özet Tablo</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Proje</strong></TableCell>
                  <TableCell align="center">Onayda</TableCell>
                  <TableCell align="center">Onaylandı</TableCell>
                  <TableCell align="center">Reddedildi</TableCell>
                  <TableCell align="center">Toplam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(projectStats).map(([project, stats]) => (
                  <TableRow key={project}>
                    <TableCell>{project}</TableCell>
                    <TableCell align="center">{stats.waiting}</TableCell>
                    <TableCell align="center">{stats.approved}</TableCell>
                    <TableCell align="center">{stats.rejected}</TableCell>
                    <TableCell align="center">{stats.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
            <Typography variant="h6">Mini Özet</Typography>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li><strong>Onaylananlar:</strong> {approved}</li>
              <li><strong>Bekleyenler:</strong> {waiting}</li>
              <li><strong>Reddedilenler:</strong> {rejected}</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Summary;
