import { useAuthUser } from "../store/authUser";

const HomePage = () => {
  const { logout } = useAuthUser();

  return (
    <div>
      HomeScreen
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
