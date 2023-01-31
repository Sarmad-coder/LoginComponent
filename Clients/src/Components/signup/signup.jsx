import "./signup.css"
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalFooter, Button } from "react-bootstrap";
export default () => {
    let { handleSubmit, register, formState } = useForm()
    let [password, setPassword] = useState()
    let [show, setShow] = useState(false)


    const signUp = async (data) => {
        data.conformation = false
        let resp = await axios.post("/Create-User", data)
        if (resp.data == "email already exsist") {
            toast.error("Email Already Registered")
        } else {
            show = true;
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }



    return <div className="body" >
        <div className="signup-form">
            <form onSubmit={handleSubmit(signUp)}>
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr />
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-user" />
                        </span>
                        <input
                            {...register("username")}
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            required="required"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-paper-plane" />
                        </span>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email Address"
                            required="required"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-lock" />
                        </span>
                        <input
                            {...register("password", { minLength: 6, maxLength: 20 })}
                            type="text"
                            className="form-control"
                            name="password"
                            placeholder="Password (6 to 20 Character)"
                            required="required"
                            onChange={(e) => {
                                password = e.target.value
                                setPassword(password)
                            }}
                        />
                    </div>
                    {formState.errors.password && <div className="error">Please Enter password 6 to 20 character long</div>}
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-lock" />
                            <i className="fa fa-check" />
                        </span>
                        <input
                            {...register("confirm_password", {
                                minLength: 6, maxLength: 20, validate: (data) => {
                                    if (data == password) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            })}
                            type="text"
                            className="form-control"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            required="required"
                        />
                    </div>
                    {formState.errors.confirm_password && formState.errors.confirm_password.type == "minLength" && <div className="error">Please Enter password 6 to 20 character long</div>}
                    {formState.errors.confirm_password && formState.errors.confirm_password.type == "validate" && <div className="error">Password doesn't Matched</div>}
                </div>
                <div className="form-group">
                    <label className="checkbox-inline">
                        <input type="checkbox" required="required" /> I accept the{" "}
                        <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Sign Up
                    </button>
                    <i class="fa-sharp fa-solid fa-inbox-in"></i>
                </div>
                <ToastContainer theme="colored" />
            </form>
            <div className="text-center">
                Already have an account? <Link to={"/"}>Login here</Link>



            </div>
        </div>

        {/* Model code start from here */}


        <Modal show={show} size="lg" onHide={() => {
            setShow(false)
        }}>
            <Modal.Header closeButton> <h4 style={{ color: "green" }}>Congratulation your account is created</h4> </Modal.Header>
            <Modal.Body> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="144" height="144" className="mx-auto d-block"><path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 0 1-1.75 1.75H1.75A1.75 1.75 0 0 1 0 18.75v-14C0 3.784.784 3 1.75 3ZM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0Zm0-2.662v.852l10.36 7a.25.25 0 0 0 .28 0l10.36-7V4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"></path></svg>
                <h5 style={{ color: "red" }} className="d-flex justify-content-center">A confirmation Email has been send to your ID Please confirm</h5>
            </Modal.Body>
            <ModalFooter><Button onClick={() => {
                setShow(false)
            }}>Close</Button></ModalFooter>
        </Modal>



    </div>
}

