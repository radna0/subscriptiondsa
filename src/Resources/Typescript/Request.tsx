type handleStateSubscription = (val: boolean) => void
type handleStateError = (val: string) => void
type handleStateForm = (e: React.FormEvent<HTMLFormElement>) => Promise<void>

interface ISubscription {
  handleSubscription: handleStateSubscription
}
interface IBtn {
  loading: boolean
  text: string
  styles: string
}
interface IhandlePostEmail {
  email: string
  handleSubscription: handleStateSubscription
  handleError: handleStateError
}
interface IhandleDelEmail {
  id: unknown
}
type ThandlePostEmail = (props: IhandlePostEmail) => Promise<void>
type ThandleDelEmail = (props: IhandleDelEmail) => Promise<void>
export type {
  handleStateSubscription,
  handleStateError,
  handleStateForm,
  IBtn,
  ISubscription,
  ThandlePostEmail,
  ThandleDelEmail,
}
