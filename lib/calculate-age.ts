export function calculateAge(dateOfBirth: string, today = new Date()) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00Z`)
  if (Number.isNaN(birthDate.getTime())) return undefined

  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const birthdayPassed = today.getUTCMonth() > birthDate.getUTCMonth() ||
    (today.getUTCMonth() === birthDate.getUTCMonth() && today.getUTCDate() >= birthDate.getUTCDate())
  if (!birthdayPassed) age -= 1
  return age >= 0 ? age : undefined
}
