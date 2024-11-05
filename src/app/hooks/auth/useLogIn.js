import { signIn } from "next-auth/react"
import {useState} from "react";

const useLogIn = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })
    console.table(result)
    return result // Return the result of the signIn
  }

  return {
    login,
    loading,
    error,
  }
}

export default useLogIn
