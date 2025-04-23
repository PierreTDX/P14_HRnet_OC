import { useEffect } from 'react'
import employees from '../../data/generated_users.json'

const useInitEmployees = () => {
  useEffect(() => {
    if (!localStorage.getItem('employees')) {
      localStorage.setItem('employees', JSON.stringify(employees))
    }
  }, [])
}

export default useInitEmployees