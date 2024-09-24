const fetchUserRole = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/role", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.role);
      return data.role;
    } else {
      console.error("Failed to fetch role");
      return "";
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    return "";
  }
};

const userRole = () => {
  // Function to fetch user role
  const [role, setRole] = useState("");
  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await fetchUserRole();
      setRole(userRole);
      setLoading(false);
    };
    getUserRole();
  }, []);
  return role;
};

export default userRole;
