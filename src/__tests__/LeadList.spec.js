import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import LeadsList from '../Pages/LeadsList.vue'

vi.mock('axios')

// Mock data
const mockLeads = [
  {
    id: '1',
    name: 'Harsh Kapoor',
    company: 'Ladybird Solution Pvt Lmt.',
    contact: '8825000011',
    budget: 3000,
    status: 'Approved',
  },
  {
    id: '2',
    name: 'Akash Bhat',
    company: 'APTEAN INDIA PRIVATE LIMITED',
    contact: '9988754214',
    budget: 5000,
    status: 'Approved',
  },
]

describe('LeadsList.vue (API Fetch)', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockLeads })
  })

  it('fetches leads from API and renders them', async () => {
    const wrapper = mount(LeadsList)

    await flushPromises() // Wait for axios + rendering

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockLeads.length)

    // Check first row content
    const firstRowCells = rows[0].findAll('td').map((td) => td.text())
    expect(firstRowCells).toContain('Harsh Kapoor')
    expect(firstRowCells).toContain('Ladybird Solution Pvt Lmt.')
    expect(firstRowCells).toContain('8825000011')
    expect(firstRowCells).toContain('3000')
    expect(firstRowCells).toContain('Approved')
  })

  it('renders table headers', async () => {
    const wrapper = mount(LeadsList)
    await flushPromises()

    const headers = wrapper.findAll('th').map((th) => th.text().trim())

    expect(headers).toEqual(['UserId', 'Name', 'Company', 'Contact', 'Budget', 'Status', 'Action'])
  })
})
