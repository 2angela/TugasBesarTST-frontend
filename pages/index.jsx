import Navbar from "@/components/navbar"
import NavbarUser from "@/components/navbaruser"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const [rowsMedia, setRowsMedia] = useState([])
  const [rowsLocation, setRowsLocation] = useState([])
  const [authstatus, setauth] = useState(false)
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      setauth(true)
    }

    const getMedia = fetch(`${apiUrl}/media`).then(async (response) => {
      if (response.status !== 200) return null;
      return response.json();
    }).catch(error=>{
      console.error(error)
      return
    })

    const getLocation = fetch(`${apiUrl}/location`).then(async (response) => {
      if (response.status !== 200) return null;
      return response.json();
      }).catch(error=>{
        console.error(error)
        return
      })

    Promise.all([getMedia, getLocation]).then(([mediaData, locationData]) => {
      setRowsMedia(mediaData || []);
      setRowsLocation(locationData || []);
    });

  }, [])

  return <>
      <main className="min-h-screen bg-[#FFFFFF]">
        {(!authstatus) && <Navbar></Navbar>}
        {(authstatus) && <NavbarUser></NavbarUser>}
        
        <div className={`min-h-screen mt-10 mx-auto relative gap-x-8 gap-y-8`}>
          {rowsMedia.map((row, index) => {
            const locationIndex = rowsLocation.find(location => location.location_id === row.location_id);
            const areaName = locationIndex ? locationIndex.area_name : 'Unknown';
            return (
              <div key={row.media_id}>
                <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-10 flex flex-row items-center justify-evenly shadow-xl w-3/4 mx-auto mb-10">
                  <Image className="item-center" src={row.image_url} alt={row.title} width={600} height={400}/>
                  <div className="flex flex-col items-center justify-evenly w-auto mx-auto mb-10">
                    <span className="text-center text-black text-xl font-extrabold mt-8">{row.title}</span>
                    <span className="text-center text-black text-base mt-5">Location: {areaName}</span>
                    <span className="text-center text-black text-base mt-3">{row.description}</span>
                    <span className="text-center text-black text-base mt-3">Tags: {row.tags}</span>
                    
                    <span className="mt-8 font-bold">Got questions?</span>
                    <button onClick={(e) => {
                      e.preventDefault();
                      router.push("/livechat")
                      }} className="item-center bg-orange-200 w-auto p-2 text-base font-bold text-black rounded-2xl mt-3">Live Chat with Staff</button>
                  </div>
                </div>
              </div>)})}
        </div>
      </main>
  </>
}
