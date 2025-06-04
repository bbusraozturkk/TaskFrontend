import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';


function NewDocument() {
  //Dosya ve sürükleme durumu için 
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  // başlangıç değerleri
  const initialValues = {
    projectCode: '',
    type: '',
    documentNo: '',
    title: '',
    contractDate: '',
    description: '',
    approvalStatus: '',
    createdBy: ''
  };

   //doğrulama kuralları
  const validationSchema = Yup.object({
    projectCode: Yup.string().required('Proje Kodu zorunludur'),
    type: Yup.string().required('Tip zorunludur'),
    documentNo: Yup.string().required('Döküman No zorunludur'),
    title: Yup.string().required('Konu zorunludur'),
    contractDate: Yup.string().required('Sözleşme Tarihi zorunludur'),
    description: Yup.string().required('Açıklama zorunludur'),
    approvalStatus: Yup.string().required('Onay durumu zorunludur'),
    createdBy: Yup.string().required('Oluşturan zorunludur')
  });

  const sharedInputProps = {
    InputLabelProps: { shrink: true, sx: { fontSize: 16 } },
    InputProps: { sx: { minHeight: 60, fontSize: 16 } }
  };

  const sharedSelectStyles = {
    fontSize: 16,
    minHeight: 60,
    '.MuiSelect-select': {
      padding: '18.5px 14px',
      display: 'flex',
      alignItems: 'center'
    }
  };

  const sharedMenuProps = {
    PaperProps: {
      sx: {
        fontSize: 16
      }
    }
  };

  // Dosya sürükle bırak işlemleri için event yakalayıcılar
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
// Dosya inputu değiştiğinde state güncelleniyor
  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };
//Form gönderildiğinde çalışıyor
  const handleSubmit = async (values) => {
    if (!file) return alert('Dosya seçmeniz gerekiyor.');
    const formData = new FormData(); //input değerleri ve dosya hazırlanıyor
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    formData.append('file', file);

    try {
      //Apiye post isteği atılıyor
      await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Döküman başarıyla eklendi.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Döküman eklenirken hata oluştu.');
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto',marginLeft: "524px", mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ padding: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Yeni Döküman Ekle
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form encType="multipart/form-data">
              <Grid container spacing={4}>
                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <TextField
                    fullWidth
                    label="Proje Kodu"
                    name="projectCode"
                    value={values.projectCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...sharedInputProps}
                  />
                  <ErrorMessage name="projectCode" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <FormControl fullWidth>
                    <InputLabel id="type-label" sx={{ fontSize: 16 }}>Tip</InputLabel>
                    <Select
                      labelId="type-label"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Tip"
                      sx={sharedSelectStyles}
                      MenuProps={sharedMenuProps}
                    >
                      <MenuItem value="">Tip Seçin</MenuItem>
                      <MenuItem value="Elektrik">Elektrik</MenuItem>
                      <MenuItem value="Mekanik">Mekanik</MenuItem>
                      <MenuItem value="İnşaat">İnşaat</MenuItem>
                      <MenuItem value="Donanım">Donanım</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage name="type" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <TextField
                    fullWidth
                    label="Döküman No"
                    name="documentNo"
                    value={values.documentNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...sharedInputProps}
                  />
                  <ErrorMessage name="documentNo" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <TextField
                    fullWidth
                    label="Konu"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...sharedInputProps}
                  />
                  <ErrorMessage name="title" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Sözleşme Tarihi"
                    name="contractDate"
                    value={values.contractDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...sharedInputProps}
                  />
                  <ErrorMessage name="contractDate" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <FormControl fullWidth>
                    <InputLabel id="approval-label" sx={{ fontSize: 16 }}>Onay Durumu</InputLabel>
                    <Select
                      labelId="approval-label"
                      name="approvalStatus"
                      value={values.approvalStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Onay Durumu"
                      sx={sharedSelectStyles}
                      MenuProps={sharedMenuProps}
                    >
                      <MenuItem value="">Onay Durumu Seçin</MenuItem>
                      <MenuItem value="Onayda">Onayda</MenuItem>
                      <MenuItem value="Onaylandı">Onaylandı</MenuItem>
                      <MenuItem value="Reddedildi">Reddedildi</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage name="approvalStatus" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Açıklama"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...sharedInputProps}
                  />
                  <ErrorMessage name="description" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12} sx={{ minWidth: 247 }}>
                  <TextField
                    fullWidth
                    label="Oluşturan"
                    name="createdBy"
                    value={values.createdBy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...sharedInputProps}
                  />
                  <ErrorMessage name="createdBy" component="div" style={{ color: 'red', marginTop: 5 }} />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    sx={{
                      border: '2px dashed #888',
                      padding: 4,
                      textAlign: 'center',
                      backgroundColor: isDragOver ? '#f5f5f5' : '#fafafa',
                      cursor: 'pointer',
                      borderRadius: 2
                    }}
                  >
                    {file ? (
                      <Typography variant="body1" fontWeight="medium">
                        Seçilen dosya: {file.name}
                      </Typography>
                    ) : (
                      <Typography variant="body1">
                        Dosyayı buraya sürükleyin veya aşağıdan seçin
                      </Typography>
                    )}
                  </Box>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileInput}
                    id="fileInput"
                  />
                  <Button
                    variant="outlined"
                    onClick={() => document.getElementById('fileInput').click()}
                    sx={{ mt: 2, fontSize: 16, minHeight: 50 }}
                  >
                    Dosya Seç
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    sx={{ fontSize: 18, minHeight: 55 }}
                  >
                    Kaydet
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default NewDocument;
