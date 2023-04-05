import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchUsers, UsersState, addUser } from "../store";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";

export function UsersList() {
  // `useState()` is used here as an alternate option to using Redux Toolkit Query
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState<null | {}>(
    null,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: { users: UsersState }) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    /*
     * `dispatch` breaks the promise's .then().catch() executing `.then()` regardless
     * of a success or failure. To get around this, use `.unwrap()`.
     * `.finally()` is used to remove rendundant code of adding:
     *   `.then(() => setIsLoadingUsers(false)).catch((err) => isLoadingUsers(false))`
     */
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  const handleUserAdd = () => {
    dispatch(addUser());
  };

  if (isLoadingUsers) {
    return <Skeleton times={data.length} className="h-10 w-full" />;
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div className="mb-2 border rounded" key={user.id}>
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
}
