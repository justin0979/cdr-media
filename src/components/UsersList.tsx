import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, UsersState, addUser } from "../store";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import { useThunk } from "../hooks";
import { UsersListItem } from "./UsersListItem";

export function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] =
    useThunk(addUser);
  const { data } = useSelector((state: { users: UsersState }) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content: React.ReactNode;

  if (isLoadingUsers) {
    content = <Skeleton times={data.length} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Error creating user..."}
      </div>
      {content}
    </div>
  );
}
