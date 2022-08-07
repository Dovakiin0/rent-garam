// things to check if logged in
const check_logged_in = async () => {
  if (localStorage.getItem("token")) {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/auth/me",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (status === 200) {
        return {
          logged_in: true,
          me: data.user,
        };
      }
    } catch (err) {
      return {
        logged_in: false,
        me: null,
      };
    }
  } else {
    return {
      logged_in: false,
      me: null,
    };
  }
};

const log_out = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export { check_logged_in, log_out };
