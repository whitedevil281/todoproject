import React from 'react'
import { useState } from 'react'

const Todotab = ({ details, todoupdate, deltodo, checkedtodo, showchecked, delcomtodos }) => {
  const [isediting, setisediting] = useState(false)
  const [editedval, seteditedval] = useState(details.text)
  const [key, setkey] = useState(details.id)
  const updatetodo = (e) => {
    seteditedval(e.target.value)
  }

  return (
    <>
      <div className="addedtodos flex gap-3 mx-3 items-center relative my-3 border border-white p-3 ">
        {!showchecked && <input type="checkbox" name="" id="" key={details.id} className="text-center" onChange={(params) => {
          checkedtodo(key)
        }
        } />}
        <div className='flex items-center '>

          {isediting ? <>
            <div className='flex flex-col sm:flex-row gap-3 sm:items-start w-full'>
              <input type="text" name="updatingval" id="" value={editedval} key={details.id} onChange={updatetodo} className="text-center  m-auto rounded-lg w-full p-1 z-10 input-todo outline-none " />
              <button className="text-white bg-blue-600 px-3  w-auto py-2  hover:bg-blue-700 rounded-lg" onClick={() => {
                todoupdate(editedval, setisediting, key)
              }
              } >Update</button>
            </div>
          </> : <>
            {
              showchecked ? <h1 className='text-white  text-sm'><s >{details.text}</s></h1> : <h1 className='text-white  text-sm'>{details.text}</h1>
            }
          </>
          }
          <div className="options flex gap-3 absolute right-5">
            {(!showchecked) && <button onClick={() => {
              setisediting(!isediting)
            }
            }>
              <img className={() => {
                if (isediting) {
                  return "z-0"
                }
                else {
                  return ""
                }
              }} src="/edit.png" alt="" />
            </button>
            }
            {!isediting &&
              <button onClick={() => {
                if (!showchecked) {
                  deltodo(key)
                }
                else {
                  delcomtodos(key)
                }
              }
              }>
                <img className={() => {
                  if (isediting) {
                    return "z-0"
                  }
                  else {
                    return ""
                  }
                }} src="/bin.png" alt="" />

              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Todotab
