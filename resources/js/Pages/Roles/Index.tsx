import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import List from "./partials/List"



export default function Index({ roles = { data: [] } }: { roles?: any }) {

    
    return (
        <Authenticated
            title={"Listado de roles"}
        >

            <Head title="Listado de roles" />

            <List roles={roles.data} />
        </Authenticated>
    )
}