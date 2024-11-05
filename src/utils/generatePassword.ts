export function generatePassword(): string {
    const length = 10;
    const caracteres: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let senha: string = '';

    for (let i = 0; i < length; i++) {
        const indice: number = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    return senha;
}
