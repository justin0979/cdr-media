import { User } from "../store";
import { useFetchAlbumsQuery } from "../store";
import { Skeleton } from "./Skeleton";
import { ExpandablePanel } from "./ExpandablePanel";
import { Button } from "./Button";

interface AlbumsListProps {
  user: User;
}

export function AlbumsList({ user }: AlbumsListProps) {
  // need to add `user` as query argument b/c it will be sent to the query parameter in
  // /src/store/apis/albumsApi.ts
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error Loading Albums</div>;
  } else {
    content = data?.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album.
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>Albums for {user.name}</div>
      <div>{content}</div>
    </div>
  );
}
