import { User } from "../store";

interface AlbumsListProps {
  user: User;
}

export function AlbumsList({ user }: AlbumsListProps) {
  return <div>Albums for {user.name}</div>;
}
