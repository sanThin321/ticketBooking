import { AdminUsersHeader } from "../../components/PageHeaders/AdminUsersHeader"

export const AdminUsers = () => {
    return (
        <>
            <AdminUsersHeader />
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div>

                    </div>
                    <div className="p-3 border border-secondary-subtle rounded">
                        <h5>Filters</h5>
                        <hr />
                        <div className="mb-3">
                            <select className="form-select" aria-label="Filter by name and email">
                                <option defaultValue>Name</option>
                                <option value="1">Name</option>
                                <option value="2">Email</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            
                        </div>

                        <div>
                            <select className="form-select" aria-label="Filter by name and email">
                                <option defaultValue>Acency</option>
                                <option value="1">JD Transport</option>
                                <option value="2">Pelyab Transport</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
