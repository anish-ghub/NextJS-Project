// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';


const  NewMeetupPage = () => {

  const router = useRouter();

  const addMeetupHandler = async(enteredMeetupData) =>{

    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    } );

    const data = await response.json();

    console.log(data);

    router.push('/');

  };


  return (
    <React.Fragment>
      <Head>
          <title>Add a new MeetUp</title>
          <meta 
            name="description" 
            content="Add your own meetups and create amazing networking opportunity!"
          />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </React.Fragment>
  );


};


export default NewMeetupPage;