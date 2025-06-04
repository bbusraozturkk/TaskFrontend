import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DescriptionIcon from '@mui/icons-material/Description';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NoteIcon from '@mui/icons-material/Note';

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    projectCode: '',
    type: '',
    approvalStatus: '',
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  //Sayfa yüklendiğinde /api/documents endpointine istek atıldığı ve gelen verilerin hem documents hem filteredDocs içine kaydedildiği yer
  useEffect(() => {
    api.get('/documents')
      .then(res => {
        setDocuments(res.data);
        setFilteredDocs(res.data);
      })
      .catch(err => console.error('API hatası:', err));
  }, []);

  //Kullanıcı arama kutusuna yazdıkça veya filtreler değiştikçe liste yeniden hesaplanır
  useEffect(() => {
    let result = documents;

    if (search) {
      result = result.filter(doc =>
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.documentNo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.projectCode) {
      result = result.filter(doc => doc.projectCode === filters.projectCode);
    }
    if (filters.type) {
      result = result.filter(doc => doc.type === filters.type);
    }
    if (filters.approvalStatus) {
      result = result.filter(doc => doc.approvalStatus === filters.approvalStatus);
    }
    if (filters.startDate) {
      result = result.filter(doc => new Date(doc.contractDate) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      result = result.filter(doc => new Date(doc.contractDate) <= new Date(filters.endDate));
    }

    setFilteredDocs(result);
  }, [search, filters, documents]);

  const columns = [
    { field: 'projectCode', headerName: 'Proje Kodu', flex: 2 },
    { field: 'type', headerName: 'Tip', flex: 2 },
    { field: 'documentNo', headerName: 'Döküman No', flex: 2 },
    { field: 'title', headerName: 'Konu', flex: 3 },
    { field: 'currentRevision', headerName: 'Revizyon', flex: 2 },
    { field: 'approvalStatus', headerName: 'Onay Durumu', flex: 2 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      flex: 2,
      renderCell: (params) => (
        <>
          <Tooltip title="Detay">
            <IconButton onClick={() => navigate(`/documents/${params.row._id}`)} color="primary">
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Revizyon Ekle">
            <IconButton component={Link} to={`/revisions/${params.row._id}/new`} color="success">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          {params.row.latestRevisionId && (
            <Tooltip title="Notlar">
              <IconButton component={Link} to={`/notlar/${params.row.latestRevisionId}`} color="warning">
                <NoteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )
    }
  ];

  return (
    <Box sx={{ padding: '8rem', maxWidth: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Döküman Listesi
      </Typography>

      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Arama"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: '300px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Proje Kodu"
            fullWidth
            value={filters.projectCode}
            onChange={(e) => setFilters(prev => ({ ...prev, projectCode: e.target.value }))}
            sx={{ minWidth: '300px' }}
          >
            <MenuItem value="">Tümü</MenuItem>
            {[...new Set(documents.map(doc => doc.projectCode))].map(code => (
              <MenuItem key={code} value={code}>{code}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Tip"
            fullWidth
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            sx={{ minWidth: '300px' }}
          >
            <MenuItem value="">Tümü</MenuItem>
            <MenuItem value="Elektrik">Elektrik</MenuItem>
            <MenuItem value="Mekanik">Mekanik</MenuItem>
            <MenuItem value="İnşaat">İnşaat</MenuItem>
            <MenuItem value="Donanım">Donanım</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Onay Durumu"
            fullWidth
            value={filters.approvalStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, approvalStatus: e.target.value }))}
            sx={{ minWidth: '300px' }}
          >
            <MenuItem value="">Tümü</MenuItem>
            <MenuItem value="Onayda">Bekleyenler</MenuItem>
            <MenuItem value="Onaylandı">Onaylandı</MenuItem>
            <MenuItem value="Reddedildi">Reddedildi</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="date"
            fullWidth
            label="Başlangıç"
            InputLabelProps={{ shrink: true }}
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            sx={{ minWidth: '300px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="date"
            fullWidth
            label="Bitiş"
            InputLabelProps={{ shrink: true }}
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            sx={{ minWidth: '300px' }}
          />
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ height: 550, width: '100%', minWidth: '1400px' }}>
        <DataGrid
          rows={filteredDocs.map((d, index) => ({ ...d, id: d._id || index }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Paper>

      <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
        <Grid item>
          <Button variant="contained" onClick={() => navigate('/documents/new')}>
            Yeni Döküman Ekle
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => navigate('/ozet')}>
            Proje Özeti
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DocumentList;
