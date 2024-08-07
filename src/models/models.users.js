import db from '../database/db_connect.js'
import bcrypt from 'bcrypt'

export const registrarUsuario = async ({ email, password, rol, lenguage }) => {
  const consulta = 'INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;'
  const passwordEncriptada = bcrypt.hashSync(password)
  const value = [email, passwordEncriptada, rol, lenguage]
  const { rowCount } = await db(consulta, value)
  console.log(rowCount)
  if (!rowCount) {
    const newError = { code: 500, message: 'no se puede crear el registro, favor intentar mas tarde' }
    throw newError
  }
}

export const verificadorCredenciales = async (email, password) => {
  const consulta = 'SELECT * FROM usuarios WHERE email = $1;'
  const value = [email]
  const { row: [usuario], rowCount } = await db(consulta, value)
  const passwordEncriptada = usuario.password
  const passwordCorrecta = await bcrypt.compare(password, passwordEncriptada)
  if (!passwordCorrecta || !rowCount) {
    const newError = { code: 401, message: 'emai o contraseña incorrecta ' }
    throw newError
  }
}

export const getUser = async (email) => {
  try {
    const consulta = 'SELECT email, rol, lenguaje FROM ususarios WHERE email = $1;'
    const value = [email]
    const { rows } = await db(consulta, value)
    return rows
  } catch (error) {
    const newError = { code: 500, message: error }
    throw newError
  }
}
