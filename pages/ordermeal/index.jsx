import NavbarUser from "@/components/navbaruser"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function OrderMeal() {
    const router = useRouter()
    const [menu, setMenu] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [location, setLocation] = useState([])

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        const getMenu = fetch (`http://localhost:8000/menu`, {
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
            return response.json();
        }).catch(error=>{
            console.error(error)
            return
        })

        const getIngredients = fetch (`http://localhost:8000/ingredients`, {
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
            return response.json();
        }).catch(error=>{
            console.error(error)
            return
        })

        const getLocation = fetch(`http://localhost:8000/location`).then(async (response) => {
            if (response.status !== 200) return null;
            return response.json();
            }).catch(error=>{
                console.error(error)
                return
            })

        Promise.all([getMenu, getIngredients, getLocation]).then(([menuData, ingredientsData, locationData]) => {
            setMenu(menuData || []);
            setIngredients(ingredientsData || []);
            setLocation(locationData || []);
          });
    }, [])

    return <>
        <main className="min-h-screen bg-[#FFFFFF]">
            <NavbarUser/>
            <button className="bg-yellow-200 rounded-full shadow-xl text-2xl font-bold flex mx-auto mt-10 mb-10 p-5"
            onClick={(e) => {
                e.preventDefault()
                router.push("/ordermeal/orderform")
              }}>Place Custom Meal Order</button>
            <div className="text-blue-800 font-extrabold text-2xl px-32 mt-10">Daftar Menu yang dapat dipesan</div>
            <table className="table-auto w-full px-32 py-10 text-center border-spacing-3 border-separate">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Menu Name</th>
                        <th>Price</th>
                        <th>Processing Time</th>
                        <th>Calories</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((row, index) => {
                        return <tr key={row.menu_id}>
                            <td className="bg-red-50 p-3">{row.menu_id}</td>
                            <td className="bg-red-50 p-3">{row.menu_name}</td>
                            <td className="bg-red-50 p-3">{row.price}</td>
                            <td className="bg-red-50 p-3">{row.duration}</td>
                            <td className="bg-red-50 p-3">{row.calories}</td>
                            <td className="bg-red-50 p-3">{row.description}</td>
                    </tr>})}
                </tbody>
            </table>

            <div className="text-blue-800 font-extrabold text-2xl px-32 mt-10">Daftar Ingredients dalam menu</div>
            <table className="table-auto w-full px-32 py-10 text-center border-spacing-3 border-separate">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ingredient Name</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((row, index) => {
                        return <tr key={row.menu_id}>
                            <td className="bg-red-50 p-3">{row.ingredient_id}</td>
                            <td className="bg-red-50 p-3">{row.ingredient_name}</td>
                    </tr>})}
                </tbody>
            </table>
        </main>
    
    </>

        
}