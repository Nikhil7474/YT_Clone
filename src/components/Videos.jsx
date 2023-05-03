import { Stack, Box } from '@mui/material'
import { VideoCard, ChannelCard } from './'


const Videos = ({ videos, direction }) => {

  if(!videos?.length) return <h1>Loading...</h1>
  return (
    <Stack direction={direction || 'row'} flexWrap='wrap' justifyContent='start' gap={2}>
      {
        videos.map((item, idx) => (

          <Box key={idx}>
            {
              item.id.videoId && <VideoCard vid={item} />
            }
            {
              item.id.channelId && <ChannelCard channelD={item} />
            }

          </Box>
        ))
      }
    </Stack>
  )
}

export default Videos
