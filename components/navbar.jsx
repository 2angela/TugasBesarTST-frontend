import { useRouter } from "next/router"
const Navbar = () => {
  const router = useRouter()
  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/auth/login")
    return;
  }

  return <>
    <header className="flex flex-row align-middle justify-between bg-blue-200 px-20 py-6">
      <div className="flex flex-row align-middle justify-center space-x-3">
        <span className="h-min my-auto font-bold text-2xl">Virtual Hotel Tour</span>
      </div>
      <div className="flex flex-row align-middle justify-center space-x-6">
        <button className="bg-orange-200 h-11/12 w-28 drop-shadow-lg font-bold text-black text-lg  my-auto p-2 " onClick={handleLogin}>Log In</button>
      </div>
    </header >
  </>
}
export default Navbar