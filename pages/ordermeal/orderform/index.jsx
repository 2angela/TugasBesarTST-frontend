import NavbarUser from "@/components/navbaruser"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

export default function OrderForm() {
    const [menu_name, setMenuName] = useState("Loading Data")
    const [ingredientsName, setIngredientsName] = useState(["Loading Data"])
    const [order_id, setOrderID] = useState(0)
    const [custom_id, setCustomID] = useState(0)
    const [location_id, setLocationID] = useState(0)
    const [location_name, setLocationName] = useState("Loading Data")
    const apiUrl = process.env.API_URL;
    
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleSubmit = async () => {
        const token = window.localStorage.getItem("token")
        const body = JSON.stringify({
            order_id, custom_id, location_id
        })
        fetch (`${apiUrl}/deliverOrder`, {
            method: "POST",
            headers: {
            "Authorization": token,
            "Content-Type": "application/json"
            },
            body
        }).then(async (response) => {
            if (response.status !== 200) {
                toast.error("Failed to create delivery order..")
                return null;
            }
            toast.success("Successfully created your order!")
            window.location.replace("/ordermeal")
        }).catch(error=>{
            console.error(error)
            return
        })
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        fetch (`${apiUrl}/menu`, {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.status !== 200) {
                toast.error("Failed to load menu data..")
                return null;
            }
            const responsejson = await response.json()
            const foundMenu = responsejson.find(item => item.menu_id === getRandomNumber(1,4));
            if (foundMenu) {
                setMenuName(foundMenu.menu_name);
            } else {
                return "Menu not found";
            }
        }).catch(error=>{
            console.error(error)
            return
        })

        fetch (`${apiUrl}/ingredients`, {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.status !== 200) {
                toast.error("Failed to load ingredients data..")
                return null;
            }
            const responsejson = await response.json()
            const ingredientsNames = responsejson.map(ingredient => ingredient.ingredient_name);
            setIngredientsName(ingredientsNames || []);
        }).catch(error=>{
            console.error(error)
            return
        })

        fetch(`${apiUrl}/location/` + getRandomNumber(1,3), {
            method: "GET",
            headers: {
              "Authorization": token,
              "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.status !== 200) return null;
            const responsejson = await response.json()
            setLocationID(responsejson.location_id || 0);
            setLocationName(responsejson.area_name || "Loading location");
            }).catch(error=>{
                console.error(error)
                return
            })

        setCustomID(5)
        setOrderID(4)
    }, [])

    return <>
    <main className="min-h-screen bg-[#FFFFFF]">
        <NavbarUser/>
        <span className="font-bold text-2xl flex mx-auto justify-center mt-10">Place a Custom Meal Order</span>
        <div>
            <div className="bg-blue-50 flex flex-col p-10 mx-96 shadow-xl border-2 mt-10 mb-10">
                <div className="flex flex-row mb-10 justify-between">
                    <div className="font-bold text-lg p-2">Menu:</div>
                    <input disabled value={menu_name} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl"></input>
                </div>
                <div className="flex flex-row justify-between mb-10">
                    <div className="font-bold text-lg p-2">Ingredients:</div>
                    <div className="flex flex-col w-2/3">
                        <input disabled value={ingredientsName[0] + " 200 gram"} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl mb-3"></input>
                        <input disabled value={ingredientsName[1] + " 30 gram"} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl mb-3"></input>
                        <input disabled value={ingredientsName[2] + " 5 clove"} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl mb-3"></input>
                        <input disabled value={ingredientsName[2] + " 2 gram"} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl mb-3"></input>
                        <input disabled value={ingredientsName[3] + " 5 gram"} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl mb-3"></input>
                    </div>
                </div>
                <div className="flex flex-row justify-between mb-10">
                    <div className="font-bold text-lg p-2">Location:</div>
                    <input disabled value={location_name} className="bg-white drop-shadow-xl w-2/3 p-2 rounded-xl"></input>
                </div>
                <button className="bg-yellow-200 drop-shadow-xl font-bold text-xl p-5" 
                onClick={handleSubmit}>Submit Order</button>
            </div>
        </div>

    </main>
    </>
}