import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1>Workout app</h1>
      <Link href="/other" legacyBehavior passHref>
        <a>other</a>
      </Link>
    </>
  )
}

export default Home
