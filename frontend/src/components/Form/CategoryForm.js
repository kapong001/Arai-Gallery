import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ borderRadius: 0}}
                />
            </div>
            <button type="submit" className="btn btn-dark w-100" style={{ borderRadius: 0}}>
                Submit
            </button>                
        </form>
    </>
  )
}

export default CategoryForm
