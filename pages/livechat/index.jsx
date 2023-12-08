import NavbarUser from "@/components/navbaruser"
import { useEffect, useState } from "react"

export default function LiveChat() {
    const [rowsLog, setrowsLog] = useState([])
    const [log, setLog] = useState(null)
    const [userID, setUserID] = useState(0)
    const apiUrl = process.env.API_URL;
    
    const findUserLog = (user_id) => {
        const logindex = rowsLog.find(log => log.user_id === user_id)
        if (!logindex) {
            return null
        }
        return logindex
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        fetch (`${apiUrl}/users/me`, {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.status !== 200) return null;
            const responsejson = await response.json()
            setUserID(responsejson.user_id)
        }).catch(error=>{
            console.error(error)
            return
        })

        const getLog = fetch(`${apiUrl}/interactionLog`, {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.status !== 200) return null;
            return response.json();
        }).catch(error=>{
            console.error(error)
            return
        })

        Promise.all([getLog]).then(([logData]) => {
            setrowsLog(logData || []);
            setLog(findUserLog(userID));
          });
    }, [])

    return <>
        <main className="min-h-screen bg-[#FFFFFF]">
            <NavbarUser />
            <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-10 flex flex-col justify-evenly shadow-xl w-3/4 mx-auto mb-10 mt-20">
                {(log) && <>
                    <span className="text-xl font-bold">{log.interaction_type}</span>
                    <span>Date: {(new Date(log.interaction_time)).toLocaleDateString()}</span>
                    <div className="flex justify-end">
                        <div className="bg-orange-200 rounded-2xl p-5 flex shadow-xl w-2/5 h-min mt-10">
                            <span>Message: {log.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="bg-white rounded-2xl p-5 shadow-xl w-full h-min mx-auto m-10">
                            Enter your message...
                        </div>
                        <button className="bg-blue-100 text-lg font-bold rounded-2xl shadow-xl h-min w-auto p-5 ml-10 mt-10 mb-10">Send</button>
                    </div>
                    </>
                }
                {(!log) && <>
                    <span className="font-bold text-xl">No Interaction Log history found.</span>
                </>}
                
            </div>
        </main>
    </>
}