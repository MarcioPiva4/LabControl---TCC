export function isValidateHouseNumber(houseNumber: string): boolean {
    // Define a regex pattern to match common house number formats
    const regex = /^[0-9]+[a-zA-Z0-9\-\/]*$/;

    // Check if the house number matches the pattern
    return regex.test(houseNumber);
}