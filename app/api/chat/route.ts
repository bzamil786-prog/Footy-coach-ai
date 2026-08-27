export async function POST() {
  return Response.json({ error: "FootyCoach chat is served by the Netlify function." }, { status: 410 })
}