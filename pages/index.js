import Head from 'next/head'
import Link from 'next/link'
import { Heading } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

export async function getStaticProps() {
  return {
    props: {
      client_id: process.env.CLIENT_ID
    }
  }
}

export default function Home(props) {
  const auth_endpoint = 'https://accounts.spotify.com/authorize'
  const response_type = 'token'
  const REDIRECT_URI = "http://localhost:3000/callback&scope=user-read-currently-playing+user-modify-playback-state"
  
  return (
    <Container mt='15vh'>
      <Stack spacing={8} w='max' alignItems='center'>
        <Heading as='h1' size='4xl'>LISTENING PARTY</Heading>
        <Text fontSize='xl'color='white'>Create a session and listen to music together with your friends</Text>
        <Button colorScheme='purple' size='lg'>
          Join Session
        </Button>
        <Button colorScheme='purple' size='lg'>
          <a href={`${auth_endpoint}?client_id=${props.client_id}&redirect_uri=${REDIRECT_URI}&response_type=${response_type}`}>Create Session</a>
        </Button>
      </Stack>
    </Container>
  )
}
