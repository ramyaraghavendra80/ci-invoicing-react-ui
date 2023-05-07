import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import './InvoiceForm.css'

export default function InvoiceForm() {
  const [newInvoice, setNewInvoice] = useState({})
  const navigate = useNavigate()

  function handleSubmit() {
    newInvoice.items = []
    fetch('http://127.0.0.1:8000/api/invoices/new/', {
      method: 'POST',
      body: JSON.stringify(newInvoice),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => navigate('/'))
  }

  return (
    <div className="container">
      <Navbar />
      <div class="mb-3">
        <label for="name" class="form-label">
          Client Name
        </label>
        <input
          type="text"
          class="form-control"
          id="name"
          value={newInvoice.client_name}
          onInput={(e) => {
            setNewInvoice({ ...newInvoice, client_name: e.target.value })
          }}
        ></input>
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">
          Date
        </label>
        <input
          type="date"
          class="form-control"
          id="date"
          value={newInvoice.date}
          onInput={(e) => {
            setNewInvoice({
              ...newInvoice,
              date: new Date(e.target.value),
            })
          }}
        ></input>
      </div>

      <button className="btn btn-primary" type="button" onClick={handleSubmit}>
        Create Invoice
      </button>
    </div>
  )
}
