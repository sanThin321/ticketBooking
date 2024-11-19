import { useEffect, useState } from "react";
import { UserDetail } from "../../components/Cards/UserDetail";
import { useStore } from "../../context/Store";
import AddMemberBtn from "../../components/AddMemberBtn";

export const AgencyUsers = () => {
  let id = localStorage.getItem("agencyId");
  const { agencyMembers, refreshAgencyMembers } = useStore();

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredMembers, setFilteredMembers] = useState(agencyMembers);

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    refreshAgencyMembers(id);
  }, []);

  useEffect(() => {
    // Filter members based on search term
    const filtered = agencyMembers.filter((member) => {
      const fullName = member.fullName.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setFilteredMembers(filtered);
  }, [searchTerm, agencyMembers]); // Re-run filter when search term or members update

  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user); 
  };

  return (
    <>
      <div className="container mt-3 d-flex align-items-center justify-content-between bg-white border p-3 rounded mb-3">
        <h4 className="mb-0">Manage Employee</h4>
        <div className="d-flex gap-3 align-items-center">
          <AddMemberBtn />
          <div className="d-flex align-items-center">
            <input
              type="search"
              className="form-control custom-search"
              placeholder="Search by name..."
              aria-label="Search"
              value={searchTerm} // Bind input to search term state
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>
        </div>
      </div>
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, index) => (
                <UserDetail
                  key={index}
                  data={member}
                  onEditClick={handleEditClick}
                  selectedUser={selectedUser}
                />
              ))
            ) : (
              <div className="text-center mt-5">
                <h5>No employees found.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
