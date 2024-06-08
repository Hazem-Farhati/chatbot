import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/user/admin/make-admin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      setMessage(data.message);
      toast.success("User now is an admin");
      resetForm(); // Reset form values
    } catch (error) {
      console.error("Error making user admin:", error);
      setMessage("Error making user admin. Please try again.");
      toast.error("Error making user admin");
    }
  };


  return (
    <Box m="20px">
      <Header title="MAKE USER ADMIN" subtitle="Make Another User an Admin" />

      <Formik
    onSubmit={(values, { resetForm }) => handleFormSubmit(values, { resetForm })}
    initialValues={initialValues}
    validationSchema={checkoutSchema}
  >

        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Admin's Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminEmail}
                name="adminEmail"
                error={!!touched.adminEmail && !!errors.adminEmail}
                helperText={touched.adminEmail && errors.adminEmail}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {message && (
              <Typography color="secondary" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Make User Admin
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  adminEmail: yup.string().email("invalid email").required("required"),
});

const initialValues = {
  adminEmail: "",
};

export default Form;
