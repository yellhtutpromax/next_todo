import { signIn } from "next-auth/react"
import {useState} from "react"
import {createSession} from "@/app/lib/session";
import {redirect} from "next/navigation";

const useLogIn = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const users = [
    { id: 1, name: "Yell Htut", username: "yellhtut", email: "yellhtut4@gmail.com", password: "admin123" },
    { id: 2, name: "Tun Min", username: "tunmin", email: "tunmin4@gmail.com", password: "admin123" },
  ];

  const login = async (email, password) => {
    setLoading(true)
    setError("")
    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      setError("Invalid credentials")
      setLoading(false)
      return false
    }
    const result = await createSession(user.id)
    console.table(result)
    if (result)
    {
      // Redirect to home or any other page on successful login
      setError("") // Update the error state
      redirect("/dashboard")
      setLoading(false)
      return true // Successful login
    }
    return result // Return the result of the signIn
  }

  return {
    login,
    loading,
    error,
  }
}

export default useLogIn
