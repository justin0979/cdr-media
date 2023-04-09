import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchUsers, UsersState, addUser } from "../store";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";

function useThunk(thunk: any) {
  /*
   * `useState()` is used here as an alternate option to using Redux Toolkit Query
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | {}>(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    /*
     * `dispatch` breaks the promise's .then().catch() executing `.then()` regardless
     * of a success or failure. To get around this, use `.unwrap()`.
     * `.finally()` is used to remove rendundant code of adding:
     *   `.then(() => setIsLoadingUsers(false)).catch((err) => isLoadingUsers(false))`
     */
    dispatch(thunk())
      .unwrap()
      .catch((err: any) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);
  /*
   * without `as const`, will give error 'TS2349: This expression is not callable'
   * see https://www.github.com/microsoft/TypeScript/issues/35423
   * see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
   */
  return [runThunk, isLoading, error] as const;
}

export function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState<null | {}>(
    null,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: { users: UsersState }) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => setCreatingUserError(err))
      .finally(() => setIsCreatingUser(false));
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
        {isCreatingUser ? (
          "Creating User..."
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError && "Error creating user..."}
      </div>
      {renderedUsers}
    </div>
  );
}
