import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ReactPlayer from "react-player"
import { Typography, Box, Stack } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

import { Videos } from "./"
import { fetchFromAPI } from "../utils/fetchFromAPI"

const VideoDetail = () => {

  const [videoDtl, setVideoDtl] = useState(null)
  const [videos, setvideos] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`)
      .then((data) => setVideoDtl(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setvideos(data.items))
  }, [id]);

  if (!videoDtl?.snippet) return <h1 color="white"> Loading...</h1>;
  const { snippet: { title, channelTitle, channelId }, statistics: { viewCount, likeCount } } = videoDtl

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }} >
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
              className='react-player' controls
            />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h4' }}
                  color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'grey', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant="body1" sx={{ opacity: 0.7 }} >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body" sx={{ opacity: 0.7 }} >
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction='column' />
        </Box>

      </Stack>
    </Box>
  )
}

export default VideoDetail
