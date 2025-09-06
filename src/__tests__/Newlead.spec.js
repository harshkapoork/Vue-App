import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { createLead } from '../Api'

vi.mock('axios')

describe('POST Lead API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should send a POST request with form data', async () => {
    const mockData = {
      name: 'John Doe',
      company: 'Test Co',
      contact: '1234567890',
      budget: 500,
      status: 'Pending',
    }

    axios.post.mockResolvedValue({ data: { id: 1, ...mockData } })

    const result = await createLead(mockData)

    expect(axios.post).toHaveBeenCalledWith(
      'https://6851a6c58612b47a2c0adbd3.mockapi.io/leads',
      mockData,
    )
    expect(result).toEqual({ id: 1, ...mockData })
  })

  it('should throw error on API failure', async () => {
    axios.post.mockRejectedValue(new Error('API Error'))

    await expect(createLead({})).rejects.toThrow('API Error')
  })
})
