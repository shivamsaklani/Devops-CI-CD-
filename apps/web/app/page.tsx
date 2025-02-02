import {database} from "@repo/prismadb/database";

export default async function Home() {
  const user = await database.user.findFirst();
  return (
    <div >
      {user?.name}
      </div>
        );
}
