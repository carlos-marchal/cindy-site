import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { Flex, Box, Text, Stack } from '@sanity/ui'
import { ImageIcon, PlayIcon } from '@sanity/icons'
import { useClient, type PreviewProps, type SanityClient } from 'sanity'

type SectionItem = {
  _type: 'image' | 'mux.video'
  _key?: string
  asset?: { _ref: string; _type: 'reference' }
}

const THUMB_COUNT = 4
const THUMB_SIZE = 36

const muxAssetCache = new Map<string, Promise<{ playbackId?: string; thumbTime?: number }>>()

function getMuxAsset(client: SanityClient, ref: string) {
  let p = muxAssetCache.get(ref)
  if (!p) {
    p = client
      .getDocument<{ playbackId?: string; thumbTime?: number }>(ref)
      .then((doc) => ({ playbackId: doc?.playbackId, thumbTime: doc?.thumbTime }))
      .catch(() => ({}))
    muxAssetCache.set(ref, p)
  }
  return p
}

export function MultiThumbPreview(
  props: PreviewProps & { items?: SectionItem[]; title?: string },
) {
  const { items = [], title = 'Section' } = props
  const client = useClient({ apiVersion: '2024-10-02' })
  const builder = imageUrlBuilder(client)

  const visible = items.slice(0, THUMB_COUNT)
  const total = items.length
  const overflow = Math.max(0, total - THUMB_COUNT)

  return (
    <Flex align="center" gap={3} padding={2}>
      <Flex gap={1}>
        {visible.length === 0 ? (
          <ThumbBox>
            <ImageIcon />
          </ThumbBox>
        ) : (
          visible.map((item, i) => (
            <Thumb key={item._key ?? i} item={item} builder={builder} client={client} />
          ))
        )}
      </Flex>
      <Stack space={2} flex={1}>
        <Text size={1} weight="medium">
          {title}
        </Text>
        <Text size={0} muted>
          {total === 0
            ? 'No items yet'
            : `${total} ${total === 1 ? 'item' : 'items'}${overflow ? ` (+${overflow} more)` : ''}`}
        </Text>
      </Stack>
    </Flex>
  )
}

function ThumbBox({ children, src }: { children?: React.ReactNode; src?: string }) {
  return (
    <Box
      style={{
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: src
          ? `center/cover no-repeat url(${src}), var(--card-muted-bg-color, #f1f1f1)`
          : 'var(--card-muted-bg-color, #f1f1f1)',
      }}
    >
      {children}
    </Box>
  )
}

function Thumb({
  item,
  builder,
  client,
}: {
  item: SectionItem
  builder: ReturnType<typeof imageUrlBuilder>
  client: SanityClient
}) {
  if (!item.asset?._ref) {
    return (
      <ThumbBox>
        <PlayIcon />
      </ThumbBox>
    )
  }
  if (item._type === 'image') {
    const src = builder.image(item).width(THUMB_SIZE * 2).height(THUMB_SIZE * 2).fit('crop').url()
    return <ThumbBox src={src} />
  }
  return <MuxThumb assetRef={item.asset._ref} client={client} />
}

function MuxThumb({ assetRef, client }: { assetRef: string; client: SanityClient }) {
  const [data, setData] = useState<{ playbackId?: string; thumbTime?: number } | null>(null)

  useEffect(() => {
    let cancelled = false
    getMuxAsset(client, assetRef).then((d) => {
      if (!cancelled) setData(d)
    })
    return () => {
      cancelled = true
    }
  }, [assetRef, client])

  if (!data?.playbackId) {
    return (
      <ThumbBox>
        <PlayIcon />
      </ThumbBox>
    )
  }

  const params = new URLSearchParams({
    width: String(THUMB_SIZE * 2),
    height: String(THUMB_SIZE * 2),
    fit_mode: 'smartcrop',
  })
  if (typeof data.thumbTime === 'number') params.set('time', String(data.thumbTime))

  return (
    <ThumbBox src={`https://image.mux.com/${data.playbackId}/thumbnail.jpg?${params}`}>
      <VideoIconOverlay />
    </ThumbBox>
  )
}

function VideoIconOverlay() {
  return (
    <Box
      style={{
        background: 'rgba(0,0,0,0.45)',
        borderRadius: '50%',
        width: 16,
        height: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <PlayIcon style={{ fontSize: 12 }} />
    </Box>
  )
}
