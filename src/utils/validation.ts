const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

export const getEmailError = (email: string) => {
    if( emailRegex.test(email)) return null; 
    else return "Controlla l'email"
}