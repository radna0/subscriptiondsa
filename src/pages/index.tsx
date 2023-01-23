import Head from 'next/head'
import Subscription from '@/Components/Subscription/Subscription'
import Quote from '@/Components/Quote/Quote'
import { useState } from 'react'
import Subscribed from '@/Components/Subscribed/Subscribed'

export default function Home() {
  const [subscribed, setSubscribed] = useState(false)
  const handleSubscription = (val: boolean) => {
    setSubscribed(val)
  }
  return (
    <>
      <>
        {subscribed ? (
          <div>
            <Subscribed></Subscribed>
          </div>
        ) : (
          <div>
            <Quote />
            <Subscription handleSubscription={handleSubscription} />
          </div>
        )}
      </>
    </>
  )
}
