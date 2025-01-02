import { useAuthUser } from "../store/authUser";

const AdminDashboard = () => {
  const { logout } = useAuthUser();

  return (
    <div>
      AdminDashboard
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
