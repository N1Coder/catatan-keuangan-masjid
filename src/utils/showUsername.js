export const showUsername = (userSession) => {
  const removeAtSymbol = userSession?.user.email.indexOf("@")
  return userSession?.user.email.slice(0, removeAtSymbol)
}
