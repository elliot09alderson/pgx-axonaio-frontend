import React from 'react'

const TokenExpired = () => {
  const handleClick = () => {
    navigator('/')
  }
  return (
    <div>
      <h1>Your Token has expired please login</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default TokenExpired