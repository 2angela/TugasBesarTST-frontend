import { useRouter } from "next/router"
const NavbarUser = () => {
  const router = useRouter()
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("/");
  }

  return <>
    <header className="flex flex-row align-middle justify-between bg-blue-200 px-10 py-5">
      <div className="flex flex-row align-middle justify-center space-x-3">
        <span className="h-min my-auto font-bold text-2xl hover:cursor-pointer" onClick={()=>router.push("/")}>Virtual Hotel Tour</span>
      </div>
      <div className="flex flex-row align-middle justify-center space-x-6">
      <button className="bg-orange-200 h-11/12 w-auto drop-shadow-lg font-bold text-black text-lg  my-auto p-2" onClick={(e)=>{e.preventDefault(); router.push("/livechat"); return}}>Live Chat</button>
        <button className="bg-orange-200 h-11/12 w-auto drop-shadow-lg font-bold text-black text-lg  my-auto p-2" onClick={(e)=>{e.preventDefault(); router.push("/ordermeal"); return}}>Order Custom Meal</button>
        <button className="bg-orange-200 h-11/12 w-auto drop-shadow-lg font-bold text-black text-lg  my-auto p-2" onClick={handleLogout}>Log Out</button>
      </div>
    </header >
  </>
}
export default NavbarUser