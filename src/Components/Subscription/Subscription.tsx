import React, { useEffect, useState } from 'react'
import { EmailRegex } from '@/Resources/Regex/Email'
import { handlePostEmail } from '@/Utility/handleRequest'
import {
  handleStateError,
  handleStateForm,
  ISubscription,
} from '@/Resources/Typescript/Request'
import Btn from '../Btn/Btn'

const Subscription: React.FC<ISubscription> = ({ handleSubscription }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleError('')
    setEmail(e.target.value)
  }
  const handleError: handleStateError = (val) => {
    setError(val)
  }
  const handleForm: handleStateForm = async (e) => {
    e.preventDefault()
    if (!EmailRegex.test(email)) handleError('Invalid Email Address!')
    if (!email.length || !EmailRegex.test(email)) return
    setLoading(true)
    await handlePostEmail({ email, handleSubscription, handleError })
    setLoading(false)
  }
  return (
    <div className=" mt-10">
      <form onSubmit={handleForm}>
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
          <Btn
            loading={loading}
            text={'SUBSCRIBE'}
            styles={'bg-indigo-500 hover:bg-indigo-600'}
          />
        </div>
      </form>
    </div>
  )
}

export default Subscription
