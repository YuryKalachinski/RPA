import { jwtDecode } from 'jwt-decode'

export const getHostFromJwtToken = (jwtToken) => {
  const decodedToken = jwtDecode(jwtToken)
  return {
    firstName: decodedToken.first_name,
    lastName: decodedToken.last_name,
    email: decodedToken.email,
    role: decodedToken.role,
  }
}
