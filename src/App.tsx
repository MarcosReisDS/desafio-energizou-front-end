import { FC, useEffect } from 'react'
import './App.css'
import Router from './shared/router'
import { getCookie } from './shared/utils/cookies'
import { useNavigate } from 'react-router-dom'

interface IApp { }
const App: FC<IApp> = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!getCookie('profile')) {
      navigate('/')
    }
  }, [])

  return <Router />
}

export default App
