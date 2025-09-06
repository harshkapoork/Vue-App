import axios from 'axios'
const API_BASE = 'https://6851a6c58612b47a2c0adbd3.mockapi.io/leads'

export const fetchLeads = async () => {
  const res = await axios.get('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads')
  return res.data
}

export const createLead = async (values) => {
  const response = await axios.post('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads', values)
  return response.data
}

export const deleteTask = async (id) => {
  const res = await axios.delete(`https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${id}`)
  return res.data
}

export const fetchLeadById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`)
  return res.data
}

export const updateLead = async (id, values) => {
  const res = await axios.put(`${API_BASE}/${id}`, values)
  return res.data
}
