import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (!secret) {
    return new Response('No secret token', { status: 401 })
  }

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret token', { status: 401 })
  }

  if (!path) {
    return new Response('No path provided', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(`/${path}`)
}
