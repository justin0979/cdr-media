import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchUsers, UsersState } from "../store";

export function UsersList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, error } = useSelector(
    (state: { users: UsersState }) => {
      return state.users;
    },
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div>
      <h1>{data.length}</h1>
    </div>
  );
}
