const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const prev = () => onPageChange(Math.max(1, currentPage - 1))
  const next = () => onPageChange(Math.min(totalPages, currentPage + 1))

  return (
    <div className='flex items-center justify-center gap-4 my-6'>
      <button onClick={prev} disabled={currentPage === 1} className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-500 text-white'}`}>Previous</button>
      <div>Page {currentPage} of {totalPages}</div>
      <button onClick={next} disabled={currentPage === totalPages} className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-red-500 text-white'}`}>Next</button>
    </div>
  )
}

export default Pagination
