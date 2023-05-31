import Button from 'react-bootstrap/Button';
import './Signup.css';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, ErrorMessage, Field, Form } from "formik";
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';


function Signup() {

    const initialValues = {
        firstName:"",
        lastName:"",
        email: "",
        password: ""
    };
    const submitForm = (values, props) => {
        console.log(values);
        props.resetForm();
        console.log(props);
        alert("Sign Up is Successfull...!")

    };
    const SignUpSchema = Yup.object().shape({
        firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Firstname is required"),
        lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Lastname is required"),
        email: Yup.string().email("Email format is invalid").required("Email is required"),
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
                    <Navbar/>
                    <div className="signupcontainer">
                        <Form className="signupform">
                            <p className="signupheading">Sign Up</p>
                            <hr />
                            <div className="signupbody">
                                <div className="form-row">
                                    <Field
                                        type="firstName"
                                        name='firstName'
                                        placeholder="Enter Firstname"
                                        className={`inputfield ${errors.firstName && touched.firstName ?
                                            "input-error" : null}`}
                                    />
                                    <ErrorMessage name="firstName" className="errormsg" component="div" />
                                </div>
                                <div className="form-row">
                                    <Field
                                        type="lastName"
                                        name='lastName'
                                        placeholder="Enter lastname"
                                        className={`inputfield ${errors.lastName && touched.lastName ?
                                            "input-error" : null}`}
                                    />
                                    <ErrorMessage name="lastName" className="errormsg" component="div" />
                                </div>
                                <div className="form-row">
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email"
                                        className={`inputfield ${errors.email && touched.email ?
                                            "input-error" : null}`}
                                    />
                                    <ErrorMessage name="email" className="errormsg" component="div" />
                                </div>

                                <div className="form-row">
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter password"
                                        className={`inputfield ${errors.password && touched.password ?
                                            "input-error" : null}`}
                                    />
                                    <ErrorMessage component="div" className="errormsg" name="password" />

                                </div>
                                <div>
                                    <p className="text">Don't have an account?<span ><Link to="/login" className="signuplink">Login here</Link></span></p>
                                </div>

                                <Button type="submit" className="signupbutton">Login</Button>
                            </div>
                        </Form>
                    </div>
                    </> );
            }}
        </Formik>
    );
}

export default Signup;