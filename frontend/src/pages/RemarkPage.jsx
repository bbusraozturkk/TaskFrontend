import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from '@mui/material';

const roles = ['Owner', 'Design', 'Class', 'Flag'];

function RemarkPage() {
  const { revisionId } = useParams(); //urlden gelen yorumların ait olduğu revizyonun Idsi
  const [activeTab, setActiveTab] = useState('Owner'); //aktif sekmenin rolü
  const [remarks, setRemarks] = useState({}); //tüm rollerin yorumlarını role göre gruplanmış şekilde tutar
  const [formVisible, setFormVisible] = useState(true); 

//GET /api/remarks/:revisionId ile yorumlar çekiliyor.
  const fetchRemarks = async () => {
    try {
      const res = await api.get(`/remarks/${revisionId}`);
      const grouped = roles.reduce((acc, role) => {
        acc[role] = res.data.filter(r => r.role === role); //roles dizisine göre gruplanıyor
        return acc;
      }, {});
      setRemarks(grouped);
    } catch (err) {
      console.error('Notlar alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchRemarks();
  }, [revisionId]);

  //Form başlangıç değerleri ve validasyon kuralları burada tanımlanıyor
  const initialValues = {
    text: '',
    createdBy: ''
  };

  const validationSchema = Yup.object({
    text: Yup.string().required('Not yazmanız gerekli.'),
    createdBy: Yup.string().required('Oluşturan kişi gerekli.')
  });

  //Form gönderildiğinde post isteği yapar
  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      ...values,
      role: activeTab,
      revisionId
    };

    try {
      await api.post('/remarks', payload);
      resetForm();
      await fetchRemarks();
    } catch (err) {
      console.error(err);
      alert('Not eklenirken hata oluştu.');
    }
  };

  return (
    <Box sx={{ padding: '10rem', marginLeft: "700px"  }}>
      <Typography variant="h5" gutterBottom>Revizyon Notları</Typography>

      <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ mb: 3 }}>
        {roles.map(role => (
          <Tab key={role} label={role} value={role} />
        ))}
      </Tabs>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>{activeTab} Notları</Typography>
        {remarks[activeTab]?.length > 0 ? ( //Seçilen role ait yorumlar listeleniyor
          <ul>
            {remarks[activeTab].map(r => (
              <li key={r._id}>
                <strong>{r.text}</strong> – <em>{r.createdBy}</em>{' '}
                <small>({new Date(r.createdAt).toLocaleString()})</small>
              </li>
            ))}
          </ul>
        ) : (
          <Typography>Henüz not yok.</Typography>
        )}
      </Paper>

      {formVisible && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Yeni Not Ekle ({activeTab})</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ mb: 2 }}>
                  <Field name="createdBy" as={TextField} label="Oluşturan" fullWidth />
                  <ErrorMessage name="createdBy" component="div" style={{ color: 'red' }} />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Field name="text" as={TextField} label="Not" fullWidth multiline rows={3} />
                  <ErrorMessage name="text" component="div" style={{ color: 'red' }} />
                </Box>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  Notu Ekle
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
    </Box>
  );
}

export default RemarkPage;
