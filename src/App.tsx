import { useState } from "react";
import UserAutoComplete from "./components/UserAutoComplete"
import useUsers from "./hooks/useUsers";
import type { ApiUser } from "./types";
import UserDetails from "./components/UserDetails";


function App() {
  const { users, error } = useUsers();
  const [selected, setSelected] = useState<ApiUser | null>(null);
  return (
    <div className=''>
      <UserAutoComplete users={users}
          error={error}
          onSelect={setSelected}/>
      <UserDetails user={selected} />
    </div>
  )
}

export default App
