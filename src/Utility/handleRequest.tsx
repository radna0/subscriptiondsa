import {
  ThandlePostEmail,
  ThandleDelEmail,
} from '@/Resources/Typescript/Request'

export const handlePostEmail: ThandlePostEmail = async ({
  email,
  handleSubscription,
  handleError,
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_POST_API_ENV}`, {
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
    if (!res.ok) throw new Error('Already Subscribed!')
    handleSubscription(true)
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
    handleError(message)
  }
}

export const handleDelEmail: ThandleDelEmail = async ({
  id,
  handleSubscription,
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DELETE_API_ENV}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
    if (!res.ok) throw new Error('Already Unsubscribed!')
    handleSubscription(true)
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
  }
}
