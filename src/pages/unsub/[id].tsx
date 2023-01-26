import Btn from '@/Components/Btn/Btn'
import Subscribed from '@/Components/Subscribed/Subscribed'
import {
  handleStateForm,
  handleStateSubscription,
} from '@/Resources/Typescript/Request'
import { handleDelEmail } from '@/Utility/handleRequest'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Items() {
  const { query } = useRouter()
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const handleSubscription: handleStateSubscription = (val) => {
    setSubscribed(val)
  }

  const handleForm: handleStateForm = async (e) => {
    const id = query.id
    e.preventDefault()
    setLoading(true)
    await handleDelEmail({ id, handleSubscription })
    setLoading(false)
  }
  return (
    <>
      {subscribed ? (
        <div>
          <Subscribed
            mainTxt={'Thank You!'}
            subTxt={'You Have Successfully Unsubscribed!'}
          />
        </div>
      ) : (
        <div>
          <form onSubmit={handleForm} action="">
            <div className=" pl-2 pr-2 opacity-85">
              <h1 className="md:text-5xl text-4xl mb-10 ">
                Are you sure about unsubscribing?
              </h1>
              <div className="opacity-80 italic ">
                <h2 className=" md:text-4xl text-3xl">
                  Practice Makes Perfect
                </h2>
                <p className=" mt-3">- Bruce Lee -</p>
              </div>
            </div>
            <div className="mt-6">
              <Btn
                loading={loading}
                text={'UNSUBSCRIBE'}
                styles={' bg-red-500 hover:bg-red-600'}
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
