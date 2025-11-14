import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import List from "./partials/List"
import { User } from "@/types/users"



export default function Index({ agents = { data: [] }, title }: { agents?: any, title?: string }) {

    
    return (
        <Authenticated
            title={title}
        >

            <Head title={title} />

            <List agents={agents.data} />
        </Authenticated>
    )
}