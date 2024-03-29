/* eslint-disable @next/next/no-img-element */
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { TokenContext } from '../../pages/callback';
import { Flex, Spacer, Tooltip } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'
import {FaPlay} from 'react-icons/fa'

const Track = ({track}) => {
  const token = useContext(TokenContext)
  const toast = useToast()
  const [icon, setIcon] = useState(<AddIcon />)
  const image = track.album.images[0].url
  const queue = async (track: string) => {
    setIcon(<CheckIcon />)
	  try {
		  const res = await axios.post("https://api.spotify.com/v1/me/player/queue", null,
        {
          params: {
            uri: track,
          },
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      )
	  } catch (err) {
		  console.log(err);
	  }
  }

  const playTrack = async (track: string) => {
    console.log(track)
    const headers = {Authorization: `Bearer ${token}`}
	  const data = {uris: [track], offset: {position: 0}}
    try {
		  const res = await axios.put("https://api.spotify.com/v1/me/player/play", data, {headers})
	  } catch (err) {
		  console.log(err);
	  }
  }

  return (
    <>     
      <Flex align='center'>
        <img width={"10%"} src={image} alt="Album cover"/> 
        <Box ml='3'>
          <Text fontWeight='bold'>
            {track.name}
          </Text>
          <Text fontSize='sm' color='whiteAlpha.900'>{track.album.artists[0].name}</Text>
        </Box>
        <Spacer />
        <Box p={1}>
        <Tooltip label="Play Track">
            <IconButton 
              onClick={() => {
                playTrack(track.uri)
                toast({
                  title: `Now Playing ${track.name} by ${track.album.artists[0].name}`,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
              }}
              variant=''
              size='sm'
              aria-label='Play track'
              fontSize='20px'
              icon={<FaPlay />}
              _hover={{ bg: "teal.700" }} 
            />
        </Tooltip>
        </Box>
        <Tooltip label="Add to Queue">
            <IconButton 
              onClick={() => {
                queue(track.uri)
                toast({
                  title: 'Added to Queue',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                })
              }}
              variant='outline'
              size='sm'
              aria-label='Add to queue'
              fontSize='10px'
              icon={icon}
              color='yellow.200'
              _hover={{ bg: "teal.700" }} 
            />
        </Tooltip>
      </Flex>
    </>
  )
}   

export default Track;