import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import List from "./partials/List"



export default function Index({ invoices = { data: [] } }: { invoices?: any }) {
    
    return (
        <Authenticated
            title={"Listado de Facturas"}
        >

            <Head title="Listado de Facturas" />

            <List invoices={invoices.data} />
        </Authenticated>
    )
}