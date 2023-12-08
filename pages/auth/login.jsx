import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Navbar from "@/components/navbar"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const requestBody = new URLSearchParams();
  const router = useRouter()

  const makeBody = () => {
    requestBody.append('username', username);
    requestBody.append("password", password);
    return requestBody
  }

  return (
    <main className="min-h-screen bg-[#F6F6F6] flex flex-col">
      <Navbar/>
      <div className="w-1/2 mx-auto my-auto">
        <h1 className="text-center font-bold text-3xl text-blue-600 mb-10">Log In</h1>

        <form className="w-3/4 flex flex-col space-y-8" onSubmit={(e) => {
            e.preventDefault()

            fetch("http://localhost:8000/token", {
                method: "POST",
                body: makeBody(),
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }).then(async (response) => {
                if (response.status !== 200){
                    toast.error("Failed to login..")
                    return
                }
                const responsejson = await response.json();
                const type = responsejson.token_type 
                const token = responsejson.access_token
                window.localStorage.setItem("token", `${type} ${token}`)
                
                router.push("/")
                return
              }).catch(() => {
                toast.error("Something went wrong..")
              })
      
        }}>
            <div className="flex flex-row align-middle justify-between ">
              <span className="h-min my-auto font-bold text-[#DA6220] text-lg">Username</span>
              <input className="w-3/4 drop-shadow-xl p-3" type="text" placeholder="Username" required value={username} onChange={(e) => {
                setUsername(e.target.value)
              }}/>
            </div>
            <div className="flex flex-row align-middle justify-between ">
              <span className="h-min my-auto font-bold text-[#DA6220] text-lg">Password</span>
              <input className="w-3/4 drop-shadow-xl p-3" type="password" placeholder="Password" required value={password} onChange={(e) => {
                setPassword(e.target.value)
              }}/>
            </div>
            <input type="submit" value={"Log In"} className="w-min px-20 py-3 mx-auto rounded-lg bg-blue-400 text-white font-bold text-xl hover:cursor-pointer"/>
          </form>
      
      </div>
    </main>
  )
}

export default Login