
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik, Formik } from "formik";
import * as Yup from "yup";

const BoardingForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  console.log("this is touched", touched);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="onboard-form">
      <h1>On Boarding</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

 <Field
        
          type="text"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <Field component="select" className="food-select" name="food">
          <option>Please Choose an Option </option>
          <option value="role">Front-End Developer</option>
          <option value="role">Back-End Developer</option>
          <option value="role">Project Manager</option>
        </Field>


        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>



       

        <button type="submit">Submit!</button>
      </Form>

      {users.map(users => (
        <ul key={users.id}>
          <li>Name: {users.name}</li>
          <li>Email: {users.email}</li>
          <li>Password: {users.password}</li>
        </ul>
      ))}
    </div>
  );
};


const onBoardingForm = withFormik({

  mapPropsToValues({ name, email, password, tos }) {
    return {
      tos: tos || false,
      password: password || "",
      email: email || "",
      name: name || ""
      
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("You didnt complete the Form"),
    email: Yup.string().required(),
    password: Yup.string(),
    tos: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions")

    
  }),

  handleSubmit(values, { setStatus }) {
    axios
      // values is our object with all our data on it.
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(BoardingForm); 







export default onBoardingForm; 