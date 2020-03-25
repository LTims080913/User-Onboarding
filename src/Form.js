import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';



const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
           .string()
           .email()
           .required("Email is a required field"),
    password: yup.string().required("You must input a password"),
    terms: yup.boolean().oneOf([true], "Please agree to the Terms and Conditions"),

});

const Form = () => {

const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
});
const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
})
const [buttonDisabled, setButtonDisabled] = useState(true);
const [post, setPost] = useState([])

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    });
}, [formState])
const validateChange = e => {
    yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    })
    .catch(error => {
        setErrors({
            ...errors,
            [e.target.name]: error.errors
        });
    });
};
const formSubmit = e => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
    .then(response => {
        setPost(response.data);
        

        setFormState({
            name: "",
            email: "",
            password: "",
            terms: ""
        })
       
    })
    .catch(error => {
        console.log(error.response)
    });
}
const inputChange = e => {
    e.persist();
    const newFormData = {
        ...formState,
        [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked: e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
}
    return (
        <form onSubmit={formSubmit}>
            <lable htmlFor="name" className="title">
                Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p>: null}

            </lable>
            <lable htmlFor="email" className="title">
                Email:
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p>: null}
            </lable>
            <lable htmlFor="password" className="title">
                Password:
                <input
                    id="password"
                    type="text"
                    name="password"
                    value={formState.password}
                    onChange={inputChange}
                />
                {errors.password.length > 0 ? <p className="error">{errors.password}</p>: null}
            </lable><br/>
            <label htmlFor="terms" className="terms" >
                <input
                    type="checkbox"
                    name="terms" 
                    checked={formState.terms} 
                    onChange={inputChange} 
                />
                
                Terms and Conditions
            </label><br/>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}

export default Form