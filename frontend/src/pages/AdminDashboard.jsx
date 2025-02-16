import { useAuthUser } from "../store/authUser";

const AdminDashboard = () => {
    const { user, authCheck } = useAuthUser();

    const handleClick = (e) => {
        e.preventDefault();
        console.log("clicked");
    };

    return (
        <>
            <h1>Admin Dashboard</h1>
            <button style={{ cursor: "pointer" }} onClick={handleClick}>
                Logout
            </button>
        </>
    );
};

export default AdminDashboard;
