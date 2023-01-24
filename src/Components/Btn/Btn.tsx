import { IBtn } from '@/Resources/Typescript/Request'
import React from 'react'

export const Btn: React.FC<IBtn> = ({ loading, text, styles }) => {
  return (
    <button
      type="submit"
      className={
        'inline-flex items-center ease-in-out duration-150 hover:text-black  px-4 py-2 font-semibold text-sm  text-white rounded-md shadow-sm opacity-100 ' +
        styles
      }
    >
      {!loading ? (
        text
      ) : (
        <>
          <svg
            className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      )}
    </button>
  )
}

export default Btn
