import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchLeadById, updateLead } from '../Api'

vi.mock('axios')

describe('Lead Edit API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchLeadById should call GET with correct ID', async () => {
    const mockLead = {
      id: '101',
      name: 'Test',
      company: 'Test Co',
      contact: '1234567890',
      budget: 300,
      status: 'Pending',
    }

    axios.get.mockResolvedValue({ data: mockLead })

    const result = await fetchLeadById('101')

    expect(axios.get).toHaveBeenCalledWith('https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/101')
    expect(result).toEqual(mockLead)
  })

  it('updateLead should call PUT with correct data', async () => {
    const mockUpdated = {
      name: 'Updated Name',
      company: 'New Co',
      contact: '0987654321',
      budget: 1000,
      status: 'Approved',
    }

    axios.put.mockResolvedValue({ data: { ...mockUpdated, id: '101' } })

    const result = await updateLead('101', mockUpdated)

    expect(axios.put).toHaveBeenCalledWith(
      'https://6851a6c58612b47a2c0adbd3.mockapi.io/leads/101',
      mockUpdated,
    )

    expect(result).toEqual({ ...mockUpdated, id: '101' })
  })

  it('should throw on fetch error', async () => {
    axios.get.mockRejectedValue(new Error('Fetch failed'))
    await expect(fetchLeadById('999')).rejects.toThrow('Fetch failed')
  })

  it('should throw on update error', async () => {
    axios.put.mockRejectedValue(new Error('Update failed'))
    await expect(updateLead('999', {})).rejects.toThrow('Update failed')
  })
})
