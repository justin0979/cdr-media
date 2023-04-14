import { GoTrashcan } from "react-icons/go";
import { Button } from "./Button";
import { ExpandablePanel } from "./ExpandablePanel";
import { AlbumsList } from "./AlbumsList";
import { User, removeUser } from "../store";
import { useThunk } from "../hooks";

interface UsersListItemProps {
  user: User;
}

export function UsersListItem({ user }: UsersListItemProps) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  /*
   *  use React.Fragment since ExpandablePanel has the div with desired classes
   *  applied
   */
  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}
