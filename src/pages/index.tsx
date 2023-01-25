import Subscription from '@/Components/Subscription/Subscription'
import Quote from '@/Components/Quote/Quote'
import { useState } from 'react'
import Subscribed from '@/Components/Subscribed/Subscribed'
import { handleStateSubscription } from '@/Resources/Typescript/Request'

export default function Home() {
  const [subscribed, setSubscribed] = useState(false)
  const handleSubscription: handleStateSubscription = (val) => {
    setSubscribed(val)
  }
  return (
    <>
      {subscribed ? (
        <div>
          <Subscribed
            mainTxt={'You Have Successfully Subscribed!'}
            subTxt={'Your Coding Journey Awaits!!!'}
          />
        </div>
      ) : (
        <div>
          <Quote />
          <Subscription handleSubscription={handleSubscription} />
        </div>
      )}
    </>
  )
}
