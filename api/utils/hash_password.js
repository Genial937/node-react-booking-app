import bcrypt from 'bcryptjs'

export const hash_password = async (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}