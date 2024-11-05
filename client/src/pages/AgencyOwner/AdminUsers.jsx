import { useEffect, useState } from "react";
import { UserDetail } from "../../components/Cards/UserDetail";
import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { useStore } from "../../context/Store";
import AddMemberBtn from "../../components/AddMemberBtn";

export const AdminUsers = () => {
  let id = localStorage.getItem("agencyId");
  const { agencyMembers, refreshAgencyMembers } = useStore();

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    refreshAgencyMembers(id);
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Sets the current user to edit
  };

  useEffect(() => {
    // Trigger refresh whenever agencyMembers updates.
  }, [agencyMembers]);
  

  return (
    <>
      <AdminHeader title="Manage Users" btn={<AddMemberBtn />} />
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            {agencyMembers.map((member, index) => (
              <UserDetail
                key={index}
                data={member}
                onEditClick={handleEditClick}
                selectedUser={selectedUser}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
