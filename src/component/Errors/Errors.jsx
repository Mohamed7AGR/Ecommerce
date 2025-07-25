import { RiErrorWarningFill } from "react-icons/ri";
import React from 'react'

export default function Errors() {
    return (
        <div className="flex justify-center flex-col items-center min-h-screen">
            <h1 className="text-9xl font-bold text-red-600"> Bad Request</h1>
          <span className="text-9xl text-red-600"><RiErrorWarningFill  /></span>
        </div>
      );
}
