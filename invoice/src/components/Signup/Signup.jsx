import Button from "react-bootstrap/Button";
import "./Signup.css";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

function Signup() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email_id: "",
    password: "",
  };
  const submitForm = (values, props) => {
    console.log(values);
    props.resetForm();
    console.log(props);
    fetch("http://127.0.0.1:8000/project/user/signup/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.state) {
          localStorage.setItem("email_id", data.email_id);
          localStorage.setItem("password", data.password);
          navigate("/login");
        } else {
          alert(data.message);
        }
      });
  };
  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email_id: Yup.string()
      .email("Email format is invalid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={submitForm}
    >
      {(formik) => {
        const { errors, touched } = formik;
        return (
          <>
            <Navbar />
            <div className="signupcontainer">
              <Form className="signupform">
                <p className="signupheading">
                  Sign Up<p className="info">To create invoices...</p>
                </p>
                <hr />
                <div className="signupbody">
                  <div className="form-row">
                    <Field
                      type="Name"
                      name="name"
                      placeholder="Enter Name"
                      className={`inputfield ${
                        errors.name && touched.name ? "input-error" : null
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      className="errormsg"
                      component="div"
                    />
                  </div>
                  <div className="form-row">
                    <Field
                      type="email"
                      name="email_id"
                      id="email"
                      placeholder="Enter email"
                      className={`inputfield ${
                        errors.email && touched.email ? "input-error" : null
                      }`}
                    />
                    <ErrorMessage
                      name="email_id"
                      className="errormsg"
                      component="div"
                    />
                  </div>

                  <div className="form-row">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      className={`inputfield ${
                        errors.password && touched.password
                          ? "input-error"
                          : null
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      className="errormsg"
                      name="password"
                    />
                  </div>
                  <div>
                    <p className="text">
                      Already have an account?
                      <span>
                        <Link to="/login" className="signuplink">
                          Login here
                        </Link>
                      </span>
                    </p>
                  </div>

                  <Button type="submit" className="signupbutton">
                    SignUp
                  </Button>
                </div>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default Signup;
