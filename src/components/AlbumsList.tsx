import { User } from "../store";
import { useFetchAlbumsQuery } from "../store";

interface AlbumsListProps {
  user: User;
}

export function AlbumsList({ user }: AlbumsListProps) {
  // need to add `user` as argument b/c it will be sent to the query parameter in
  // /src/store/apis/albumsApi.ts
  //const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const results = useFetchAlbumsQuery(user);
  console.log(results);

  // console.log(data, error, isLoading);

  return <div>Albums for {user.name}</div>;
}
