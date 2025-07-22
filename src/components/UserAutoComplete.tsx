import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import type { ApiUser, ParsedName } from '../types';
import { parseName, formatParsedName, compareParsedNames } from '../utils/UsersNameFormat';
import { useMemo } from 'react';


export interface UserAutocompleteOption {
    user: ApiUser;
    parsed: ParsedName;
    label: string;
}
export interface UserAutocompleteProps {
    users: ApiUser[];
    loading?: boolean;
    error?: string | null;
    onSelect?: (user: ApiUser | null) => void;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
}

function UserAutoComplete({
    users,
    error = null,
    onSelect,
    disabled = false,
    label = 'Search Users',
    placeholder = 'Start typing a name…',
}: UserAutocompleteProps) {    
    const options = useMemo<UserAutocompleteOption[]>(() => {
    const mapped = users.map((u) => {
        const parsed = parseName(u.name);
        const label = formatParsedName(parsed);
        return { user: u, parsed, label };
    });
    mapped.sort((a, b) => compareParsedNames(a.parsed, b.parsed));
    return mapped;
    }, [users]);

    return (
        <div>
            <Autocomplete
                disablePortal
                options={options}
                sx={{ width: 300 }}
                onChange={(_evt, value) => {
                    onSelect?.(value ? value.user : null);
                }}
                disabled={disabled || (!!error && users.length === 0)}
                renderInput={(params) => (
                    <TextField {...params} label={label} placeholder={placeholder} error={!!error}
                    />
                )}
            />
        </div>
    )
}

export default UserAutoComplete