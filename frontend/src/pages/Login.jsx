
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaSignInAlt } from "react-icons/fa"
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from "./components/Spinner"


function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const {email, password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //  Variables declared BEFORE useEffect
  const {user, isLoading, isError, isSuccess, message} = useSelector(state=> state.auth)


  useEffect(()=>{
      if(isError){
        toast.error(message)
      }
  // Redirect
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
    }, [isError, isSuccess, user, message,navigate, dispatch])

  
  const onChange = (e)=>{
    setFormData((prevState)=>({ 
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const onSubmit = (e)=>{
    e.preventDefault()

    const userData = {
            email,
            password
          }
          dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner />  
  }
  
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />Login
        </h1>
        <p>Please Login to  account</p>

      </section>
        <form onSubmit={onSubmit}>
          <div className="form-group">

             <input 
            type="email" 
            id='email' 
            name="email"
            value={email} 
            className="form-control"
            placeholder="Please enter your email"
            onChange={onChange}
             />

            <input 
            type="password" 
            id='password' 
            name="password"
            value={password} 
            className="form-control"
            placeholder="Please enter your password"
            onChange={onChange}
             />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>

      <section>

      </section>
    </>
    
  )
}

export default Login