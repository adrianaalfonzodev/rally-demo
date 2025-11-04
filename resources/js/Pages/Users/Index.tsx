import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import List from "./partials/List"
import { User } from "@/types/users"



export default function Index({ users = { data: [] } }: { users?: any }) {

    
    return (
        <Authenticated
            title={"Listado de usuarios"}
        >

            <Head title="Listado de usuarios" />

            <List users={users.data} />
        </Authenticated>
    )
}