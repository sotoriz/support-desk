import { useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from './components/Spinner'
import {createTicket, reset} from '../features/ticket/ticketSlice'
import BackButton from "./components/BackButton"


const NewTicket = () => {
  const {user} = useSelector((state)=>state.auth)
  const {isError, isSuccess, isLoading, message} = useSelector(
    (state)=>state.tickets
  )

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  // const [name, setName] = useState(user?.name || '')
  // const [email, setEmail] = useState(user?.email || '')

  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

  }, [user, navigate])

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      dispatch(reset())
      navigate('/tickets')
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message])

  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(createTicket({product, description}))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill the form below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input 
            id="name"
            className="form-control" 
            type="text" 
            value={name} 
            disabled 
            />

          </div>

          <div className="form-group">
            <label htmlFor="name">Customer Email</label>
            <input 
            id="email"
            className="form-control" 
            type="email" 
            value={email} 
            disabled 
            />

          </div>

          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select 
            id="product" 
            value={product}  
            onChange={(e)=>setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="HP Elitebook">HP Elitebook</option>
              <option value="HP Probook">HP Probook</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
            id="description" 
            className="form-control"
            placeholder="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
             <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    
    </>
  )
} 

export default NewTicket
