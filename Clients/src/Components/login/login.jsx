import { Link, useParams } from "react-router-dom";
import "./login.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Modal, ModalFooter, Button } from "react-bootstrap";
import { useState } from "react";

function Login() {
  let { handleSubmit, register, formState } = useForm()
  let dispatch = useDispatch()
  let move = useNavigate()
  let [show, setShow] = useState()

  let params = useParams()
  useEffect(() => {
    if (params.id) {
      axios.put("/User-Conformation", { data: params.id }).then((res) => {

        console.log(res.data)

        if (res.data == "Conform Successfully") {
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 3000);
        }
      })
    }
  }, [])

  const loginUser = async (data) => {
    let res = await axios.get("/Get-User?email=" + data.email + "&password=" + data.password)
    if (res.data) {
      if (res.data.conformation) {
        dispatch({
          type: "LoginUser",
          payload: res.data
        })
        move("/dashboard")
      }else{
        toast.error("Please Conform your Email")
      }
      
    } else {
      toast.error("Invalid UserName or Password")
    }
  }
  return <section className="vh-100">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 text-black">
          <div className="px-5 ms-xl-4">
            <i
              className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
              style={{ color: "#709085" }}
            />
            
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>
          <div className="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <form onSubmit={handleSubmit(loginUser)}>
              <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                Log in
              </h3>
              <div className="form-outline mb-4">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="form2Example18"
                  className="form-control form-control-lg"
                />
                {formState.errors.email && <div className="error">Please Enter you Email</div>}
                <label className="form-label" htmlFor="form2Example18">
                  Email address
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="form2Example28"
                  className="form-control form-control-lg"
                />
                {formState.errors.password && <div className="error">Please Enter you Password</div>}
                <label className="form-label" htmlFor="form2Example28">
                  Password
                </label>
              </div>
              <div className="pt-1 mb-4">
                <button className="btn btn-info btn-lg btn-block">
                  Login
                </button>
              </div>
              <p className="small mb-5 pb-lg-2">
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>
              <p>
                Don't have an account?{" "}
                <Link to={"sign-up"}>
                  Register here
                </Link>
              </p>

            </form>
            <ToastContainer theme="colored"/>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image"
            className="w-100 vh-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>


    {/* Model code start from here */}


    <Modal show={show} size="lg" onHide={() => {
      setShow(false)
    }}>
      <Modal.Header closeButton> <h3 style={{ color: "green" }} className="d-flex justify-content-center position-absolute start-0 end-0">Congratulation</h3> </Modal.Header>
      <Modal.Body> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="300" height="300" className="d-block mx-auto"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z"></path></svg>
        <h3 style={{ color: "red" }} className="d-flex justify-content-center">Your Email has been verified</h3>
      </Modal.Body>
      <ModalFooter><Button onClick={() => {
        setShow(false)
      }}>Close</Button></ModalFooter>
    </Modal>
  </section>


}

export default Login;