import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

import { fetchLeads, deleteTask } from '../Api'

vi.mock('axios')

describe('API Calls', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchLeads() should fetch data from API', async () => {
    const mockData = [{ id: 1, name: 'Test Lead' }]
    axios.get.mockResolvedValue({ data: mockData })

    const result = await fetchLeads()

    expect(axios.get).toHaveBeenCalledWith('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads')
    expect(result).toEqual(mockData)
  })

  it('deleteTask() should delete a lead by id', async () => {
    const id = 1
    axios.delete.mockResolvedValue({ data: { success: true } })

    const result = await deleteTask(id)

    expect(axios.delete).toHaveBeenCalledWith(
      `https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/${id}`,
    )
    expect(result).toEqual({ success: true })
  })
})
