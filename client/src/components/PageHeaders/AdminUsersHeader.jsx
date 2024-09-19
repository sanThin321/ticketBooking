import { SlidersHorizontal } from "lucide-react"


export const AdminUsersHeader = () => {
    return (
        <div className="container rounded container-shadow py-3 my-4">
            <div className="rounded-4 d-flex align-items-center">
                <div className="col-2 align-items-center">
                    <h4 className="mb-0">Manage Users</h4>
                </div>
                <div className="col-lg-10">
                    <div className="d-flex justify-content-end gap-3">
                        <div className="input-group w-25">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Seach..."
                                aria-describedby="search-button"
                            />
                        </div>
                        <div>
                            <button className="btn">
                                <SlidersHorizontal />
                            </button>

                        </div>

                        {/* <div>
                            {/* Button to toggle the offcanvas
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >

                        </button>

                        {/* The offcanvas itself */}
                        {/* <div
                            className="offcanvas offcanvas-end"
                            tabIndex="-1"
                            id="offcanvasRight"
                            aria-labelledby="offcanvasRightLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                                    Offcanvas right
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body">
                                <div>
                                    <select className="form-select" aria-label="Filter by name and email">
                                        <option defaultValue>Name</option>
                                        <option value="1">Name</option>
                                        <option value="2">Email</option>
                                    </select>
                                </div>

                                <div>
                                    <select className="form-select" aria-label="Filter by name and email">
                                        <option defaultValue>Role</option>
                                        <option value="1">Agency Owner</option>
                                        <option value="2">Driver</option>
                                        <option value="2">Ticket Agent</option>
                                        <option value="3">User</option>
                                    </select>
                                </div>

                                <div>
                                    <select className="form-select" aria-label="Filter by name and email">
                                        <option defaultValue>Acency</option>
                                        <option value="1">JD Transport</option>
                                        <option value="2">Pelyab Transport</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        {/* </div> */}
                    </div>

                </div>
            </div>
        </div >
    )
}
