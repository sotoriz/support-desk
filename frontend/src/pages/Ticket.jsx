import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux" 
import { getTicket,  reset, closeTicket } from "../features/ticket/ticketSlice"
import {getNotes, createNote, reset as notesReset} from '../features/note/noteSlice'
import Spinner from './components/Spinner'
import { toast } from 'react-toastify'
import BackButton from './components/BackButton'
import NoteItem from './components/NoteItem'

const customStyle = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const {ticket, isError, isSuccess,isLoading, message }  = useSelector((state)=>state.tickets) 
  const {notes, isLoading: notesIsLoading} = useSelector((state)=> state.notes)

  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const params = useParams()
  const {ticketId} = useParams()

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))

    // esling-disable-next-line
  }, [isError,ticketId, dispatch,  message])
  
  // close ticket
  const onTicketClose = ()=>{
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed')
    navigate('/tickets')
  }

  if(isError){
    return <h3>Something went wrong</h3>
  }

  if(isLoading || notesIsLoading){
      return <Spinner />
    }

    // open / close modal
    const openModal = ()=> setModalIsOpen(true)
    const closeModal = ()=> setModalIsOpen(false)


    //  Submit Note
    const onNoteSubmit = (e)=> {
      e.preventDefault()

      // console.log('Note Submitted');

      dispatch(createNote({noteText, ticketId}))
      
      setNoteText('')
      closeModal()
    } 

  return (

    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          TicketID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted:{new Date(ticket.createdAt).toLocaleString('en-US')} </h3>        
        <h3>Product:{ticket.product}</h3>

         <hr />
        <div className="ticket-desc">
          <h3>Description of Issues</h3>
          <p>{ticket.description}</p>
        </div>
          <h2>Notes</h2>
      </header>

      {ticket.status  !== 'closed' && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        style={customStyle} 
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
              <textarea 
              name="noteText" 
              id="noteText" 
              className="form-control"
              placeholder="Note Text"
              value = {noteText}
              onChange={(e)=>setNoteText(e.target.value)}
              ></textarea>
          </div>
          <div className="div form-group">
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </Modal>

      { 
         notes.map((note) =>(
          <NoteItem key={note._id} note={note} /> 
        ))
      }

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>    
      )}

    </div>
    
    // <h1>Ticket Details</h1>
  )
}

export default Ticket