import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedSign({children}) {
  if (localStorage.getItem("userToken") !== null) {
    return <Navigate to="/" replace={true} />
  }
  return children;
}



