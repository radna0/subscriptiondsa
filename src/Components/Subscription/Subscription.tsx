import React, { useEffect, useState } from 'react'
import { EmailRegex } from '@/Resources/Regex/Email'
interface ISubscription {
  handleSubscription: (val: boolean) => void
}
const Subscription: React.FC<ISubscription> = ({ handleSubscription }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleError = (val: string) => {
    setError(val)
  }
  useEffect(() => {
    if (!EmailRegex.test(email)) handleError('Invalid Email Address!')
    else handleError('')
  }, [email])
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || error) return
    setLoading(true)
    await fetch(`${process.env.NEXT_PUBLIC_POST_API_ENV}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.blob()
        }
        throw new Error('Already Subscribed!')
      })
      .then((data) => handleSubscription(true))
      .catch((e) => handleError(e.message))
    setLoading(false)
  }
  return (
    <div className=" mt-10">
      <form onSubmit={handleForm} action="">
        <div className="flex items-center flex-col mx-16">
          <input
            onChange={handleEmail}
            value={email}
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 focus:outline-none focus:border-sky-500 focus:ring-sky-500 mb-5"
            type="text"
            placeholder="Your Email"
          />
          {email && error && (
            <div
              className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-60 mb-5 "
              role="alert"
            >
              <strong className="font-bold">Error! </strong>
              <span className="block">{error}</span>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center ease-in-out duration-150 hover:text-black hover:bg-indigo-600 px-4 py-2 font-semibold text-sm bg-indigo-500 text-white rounded-md shadow-sm opacity-100"
          >
            {!loading ? (
              'SUBSCRIBE'
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
        </div>
      </form>
    </div>
  )
}

export default Subscription
