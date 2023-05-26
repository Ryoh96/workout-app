import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

const Login: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      {session ? (
        <div>
          <p>{session.user?.email}としてログイン中</p>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={() => signIn()}>ログイン</button>
        </div>
      )}
    </>
  )
}

export default Login
