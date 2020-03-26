import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';



const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    lname: yup.string().required("Your last name will show up on the back of your shirt. Please input your last name"),
    email: yup
        .string()
        .email()
        .required("Email is a required field"),
    password: yup.string().required("You must input a password"),
    terms: yup.boolean().oneOf([true], "Please agree to the Terms and Conditions"),
    phoneNumber: yup.string().required("Please inter your 10 digit phone number"),
    shirt: yup.string().required("Please choose your shirt size"),
    color: yup.string().required("Choose a color for your shirt"),
    race: yup.string().required("Please choose a race length"),
    gender: yup.string().required("Please select your gender from the drop down menu")

});

const Form = () => {

    const [formState, setFormState] = useState({
        name: "",
        lname: "",
        email: "",
        password: "",
        terms: "",
        phoneNumber: "",
        shirt: "",
        color: "",
        race: "",
        gender: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        lname: "",
        email: "",
        password: "",
        terms: "",
        phoneNumber: "",
        shirt: "",
        color: "",
        race: "",
        gender: ""
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
                    lname: "",
                    email: "",
                    password: "",
                    terms: "",
                    phoneNumber: "",
                    shirt: "",
                    color: "",
                    race: "",
                    gender: ""
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
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    }
    return (
        <form onSubmit={formSubmit}>
            <lable htmlFor="name" className="title">
                First Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                    placeholder="First Name"
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}

            </lable>
            <lable htmlFor="lname" className="title">
                Last Name:
                <input
                    id="lname"
                    type="text"
                    name="lname"
                    value={formState.lname}
                    onChange={inputChange}
                    placeholder="Last Name"
                />
                {errors.lname.length > 0 ? <p className="error">{errors.lname}</p> : null}

            </lable>
            <lable htmlFor="gender" className="title">
                                   
                <select id="gender" name="gender" onChange={inputChange}>
                                        <option value="choose">Gender</option>
                                        <option value="male"> Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                       
                                    </select>
                                   
                                </lable>
            
           
            
            <lable htmlFor="email" className="title">
                Email:
                <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={inputChange}
                                        placeholder="5kFinalist@runner.com"
                                    />
                                    {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                                </lable>
                                <lable htmlFor="password" className="title">
                                    Password:
                <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formState.password}
                                        onChange={inputChange}
                                        placeholder="Password"
                                    />
                                    {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                                </lable>
                                <lable htmlFor="role" className="title">
                                    Shirt Size:
                <select id="shirt" name="shirt" onChange={inputChange}>
                                        <option value="choose">Choose A Shirt Size</option>
                                        <option value="small"> Small (S)</option>
                                        <option value="medium">Medium (M)</option>
                                        <option value="large">Large (L)</option>
                                        <option value="X-large">Extra Large (XL)</option>
                                        <option value="2x">Extra Extra Large (XXL)</option>
                                    </select>
                                    {errors.shirt.length > 0 ? <p className="error">{errors.shirt}</p> : null}
                                </lable>
                                <label htmlFor="color" className="title">
                                    Shirt Color:
                <input
                                        id="color"
                                        type="color"
                                        name="color"
                                        value={formState.color}
                                        onChange={inputChange}
                                    />

                                </label>
                                <lable htmlFor="phoneNumber" className="title">
                                    Phone Number:
                <input
                                        id="phoneNumber"
                                        type="tel"
                                        name="phoneNumber"
                                        value={formState.phoneNumber}
                                        onChange={inputChange}
                                        placeholder="999-999-9999"
                                    />
                                    {errors.phoneNumber.length > 0 ? <p className="error">{errors.phoneNumber}</p> : null}
                                </lable><br />
                                <lable htmlFor="race" className="title">
                                   
                                   <select id="race" name="race" onChange={inputChange}>
                                                           <option value="choose">Choose A Race</option>
                                                           <option value="5k"> 5k</option>
                                                           <option value="10k">10k</option>
                                                           <option value="15k">15k</option>
                                                          
                                                       </select>
                                                      
                                                   </lable>
                               
                                <label htmlFor="terms" className="terms" >
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        checked={formState.terms}
                                        onChange={inputChange}
                                    />
                                    
               

                Medical and Liability Waiver
            </label><br />
                                <pre>{JSON.stringify(post, null, 2)}</pre>
                                <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}

export default Form