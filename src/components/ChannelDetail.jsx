import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI';


const ChannelDetail = () => {

  const { id } = useParams();
  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data)=> setchannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&id?order=date`)
      .then((vidData)=> setVideos(vidData?.items));
  }, [id])
  

  return (
    <Box minHeight='95vh'>
      <Box>
        <div 
        style={{
          background: 'linear-gradient(90deg, rgba(19,117,227,1) 0%, rgba(119,34,209,1) 35%, rgba(255,0,215,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
        <ChannelCard channelD={channelDetail} 
          marginTop= '-110px'
        />
      </Box>
      <Box display='flex' p="2">
          <Box sx={{
            mr:{sm: '100px'}
          }} />
            <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
