import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import List from "./partials/List"
import { User } from "@/types/users"



export default function Index({ products = { data: [] } }: { products?: any }) {

    
    return (
        <Authenticated
            title={"Listado de Productos"}
        >

            <Head title="Listado de Productos" />

            <List products={products.data} />
        </Authenticated>
    )
}