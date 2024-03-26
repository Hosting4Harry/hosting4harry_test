import AuthService from "../AuthService";

const Protected = () => {
  const user = AuthService.getCurrentUser();

  if (!user) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={AuthService.logout}>Logout</button>
    </div>
  );
};

export default Protected;
