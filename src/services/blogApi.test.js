import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { getBlogById, getBlogs } from './blogApi'

const mockAxiosGet = vi.hoisted(() => vi.fn())

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get: mockAxiosGet })),
    get: mockAxiosGet,
  },
}))

describe('blogApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('requests the app proxy for blog listings', async () => {
    axios.get.mockResolvedValueOnce({
      data: { posts: [{ id: 1, title: 'First Post' }], total: 1 },
    })

    await getBlogs(2)

    expect(axios.get).toHaveBeenCalledWith('/api/blogs?limit=9&skip=9')
  })

  it('requests the app proxy for a single blog detail', async () => {
    axios.get.mockResolvedValueOnce({
      data: { id: 7, title: 'Detailed Post' },
    })

    await getBlogById(7)

    expect(axios.get).toHaveBeenCalledWith('/api/blog?blogId=7')
  })
})
