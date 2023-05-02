import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserList from '@/components/UserList'
import 'bulma/css/bulma.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <UserList />
    </>
  )
}
