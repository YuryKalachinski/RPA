import { jwtDecode } from "jwt-decode";

export const isExpired = (jwtToken) => {
    if (!jwtToken) return true;
    try {
        const decoded = jwtDecode(jwtToken);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export const sortFromDictionary = (a, b, dictionary) => {
    const validA = a ?? "";
    const validB = b ?? "";

    const priorityA = dictionary?.get(validA)?.priority ?? 124;
    const priorityB = dictionary?.get(validB)?.priority ?? 124;

    return priorityA !== priorityB
        ? priorityA - priorityB
        : validA.localeCompare(validB, undefined, { numeric: true });
};
