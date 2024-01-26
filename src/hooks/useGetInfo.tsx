const useGetInfo = () => {
  const storedData = localStorage.getItem("id");

  if (storedData !== null) {
    const { userID, profileURL, userName, isLogged } = JSON.parse(storedData);
    return { userID, profileURL, userName, isLogged };
  } else {

    return { userID: null, profileURL: null, userName: null, isLogged: false };
  }
};

export default useGetInfo;
