import React from 'react'
import type { ApiUser } from '../types';
import { formatParsedName, parseName } from '../utils/UsersNameFormat';

export interface UserDetailCardProps {
  user: ApiUser | null;
}

function UserDetails({ user }: UserDetailCardProps) {
    if (!user) return null;
    const parsed = parseName(user.name);
    const displayName = formatParsedName(parsed);
    const a = user.address;
    return (
        <div>
            <p>{displayName}</p>
            <p>{a.street}</p>
            <p>{a.suite}</p>
            <p>{a.zipcode}</p> 
        </div>
    )
}

export default UserDetails