import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import { Box, Typography, TextField, MenuItem, Button, Paper } from "@mui/material";

function AddRevision() {
  const { id } = useParams(); //urldeki döküman Idsi
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // Yüklenen dosya
  const [isDragOver, setIsDragOver] = useState(false); //Dosyayı sürükleyip bırakabilmek için

  //Formun ilk değerlerinin ve alanlarının zorunlu olup olmadığının tanımlandığı yer.
  const initialValues = {
    uploadedBy: "",
    notes: "",
    role: "",
  };

  const validationSchema = Yup.object({
    uploadedBy: Yup.string().required("Yükleyen zorunlu"),
    notes: Yup.string().required("Notlar zorunlu"),
    role: Yup.string().required("Rol seçimi zorunlu"),
  });

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

//FormData nesnesi kullanılarak dosya ve alanlar birlikte gönderiliyor
  const handleSubmit = async (values) => {
    if (!file) {
      alert("Lütfen bir dosya seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedBy", values.uploadedBy);
    formData.append("notes", values.notes);
    formData.append("role", values.role);
    formData.append("file", file);

    try {
      await api.post(`/revisions/${id}/revision`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Revizyon başarıyla eklendi.");
      navigate(`/documents/${id}`);
    } catch (err) {
      console.error(err);
      alert("Revizyon eklenirken hata oluştu.");
    }
  };

  return (
    <Box sx={{ padding: "15rem", marginLeft: "524px", display: "flex", justifyContent: "center" }}>
      <Paper sx={{ padding: "3rem", width: "100%", maxWidth: "800px" }} elevation={3}>
        <Typography variant="h4" gutterBottom>Yeni Revizyon Ekle</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <Form encType="multipart/form-data">
              <TextField
                fullWidth
                name="uploadedBy"
                label="Yükleyen"
                value={values.uploadedBy}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage name="uploadedBy" component="div" style={{ color: "red" }} />

              <TextField
                fullWidth
                name="notes"
                label="Notlar"
                value={values.notes}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
              <ErrorMessage name="notes" component="div" style={{ color: "red" }} />

              <TextField
                select
                fullWidth
                name="role"
                label="Rol Seçiniz"
                value={values.role}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="">Rol Seçiniz</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Class">Class</MenuItem>
                <MenuItem value="Flag">Flag</MenuItem>
              </TextField>
              <ErrorMessage name="role" component="div" style={{ color: "red" }} />
            
              <Box
              //Dosya bırakıldığında setFile ile dosya state'e kaydedilir
                onDrop={handleDrop} 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                sx={{
                  border: "2px dashed #aaa",
                  padding: "2rem",
                  textAlign: "center",
                  backgroundColor: isDragOver ? "#f0f0f0" : "#fff",
                  marginY: 3
                }}
              >
                {file ? (
                  <Typography><strong>Seçilen dosya:</strong> {file.name}</Typography>
                ) : (
                  <Typography>Dosyayı buraya sürükleyin veya aşağıdan seçin</Typography>
                )}
              </Box>

              <Button
//klasik dosya seçimi 
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Dosya Seç
                <input type="file" hidden onChange={handleFileInput} />
              </Button>

              {file && <Typography align="center" sx={{ mb: 2 }}>{file.name}</Typography>}

              <Button type="submit" variant="contained" fullWidth>
                Kaydet
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default AddRevision;