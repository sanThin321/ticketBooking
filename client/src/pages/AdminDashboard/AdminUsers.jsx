import { useEffect, useState } from "react";
import { Passangers } from "../../components/Cards/Passangers";
import { useStore } from "../../context/Store";

export const AdminUsers = () => {
    let id = localStorage.getItem("agencyId");
    const { refreshAllMembers, allMembers } = useStore();
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [filteredMembers, setFilteredMembers] = useState([]); // State for filtered members
    const [selectedUser, setSelectedUser] = useState(null);

    if (!id) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        refreshAllMembers();
    }, []);

    useEffect(() => {
        // Filter members based on search term (only by first and last name)
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = allMembers.filter((member) => {
            return (
                member.userType === "Customer" &&
                (member.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
                    member.lastName.toLowerCase().includes(lowerCaseSearchTerm))
            );
        });
        setFilteredMembers(filtered);
    }, [searchTerm, allMembers]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term as the user types
    };

    const handleEditClick = (user) => {
        setSelectedUser(user); // Sets the current user to edit
    };

    return (
        <>
            <div className="mt-3 container align-items-center d-flex justify-content-between bg-white border p-3 rounded mb-3">
                <h4 className="mb-0">Manage Users</h4>
                <div className="d-flex gap-3">
                    <div>
                        <input
                            type="search"
                            className="form-control custom-search"
                            placeholder="Search..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange} // Update search term on change
                        />
                    </div>
                </div>
            </div>
            <div className="container px-0">
                <div className="d-flex justify-content-between gap-4">
                    <div className="w-100">
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((member, index) => (
                                <Passangers
                                    key={index}
                                    data={member}
                                    onEditClick={handleEditClick}
                                    selectedUser={selectedUser}
                                />
                            ))
                        ) : (
                            <div className="text-center">
                                <h5>No users match the search criteria.</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
