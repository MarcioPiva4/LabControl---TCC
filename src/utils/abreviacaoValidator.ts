export function isAbreviacaoValidator(s: string){
    const forbiddenUnits = /\b(g|Kg|T|ml|L|Un)\b/i;
    return forbiddenUnits.test(s);
}