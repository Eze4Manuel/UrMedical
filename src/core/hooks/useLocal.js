import React from 'react';

const PRIFIX = 'wedidit-app-ls-001-';

export default function useLocalStorage(key, initialValue) {
    const pKey = PRIFIX + key;

    // Get value from local storage
    const [value, setValue] = React.useState(() => {
        const json = localStorage.getItem(pKey);

        try {
            if (json && json !== null) {
                return JSON.parse(json);
            }
        } catch (e) {
            return null;
        }

        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    // Add value to local storage
    React.useEffect(() => {
        const result = JSON.stringify(value);
        localStorage.setItem(pKey, result);

    }, [pKey, value]);

    return [value, setValue];
}
