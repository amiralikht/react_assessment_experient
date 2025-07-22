import { useEffect, useState } from 'react';
import { FetchUsers } from '../utils/FetchUsers';
import type { ApiUser } from '../types';


const DEFAULT_API = 'https://jsonplaceholder.typicode.com/users';


export function useUsers(apiUrl: string = DEFAULT_API) {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    FetchUsers(apiUrl)
      .then((data) => {
        if (!isMounted) return;
        setUsers(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : String(err));
        setUsers([]);
      })
      .finally(() => {
        if (!isMounted) return;
      });

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return { users, error };
}

export default useUsers