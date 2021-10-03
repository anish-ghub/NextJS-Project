import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import React from 'react';



const MeetupDetails = (props) => {

  return (

    <React.Fragment>

      <Head>
        <title>{props.meetupData.title}</title>
        <meta 
          name="description" 
          content={props.meetupData.description}
        />
      </Head>

      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />

    </React.Fragment>
    

  );

}



export  const getStaticPaths = async() => {


  // Establish Connection
  const client = await MongoClient.connect(
    'mongodb+srv://Anish_MB:importMongo@cluster0.3udzw.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id:1}).toArray();

  client.close();



  return {

    fallback: 'blocking', // Dynamic

    paths: meetups.map( meetup => ( { 

      params:{ meetupId : meetup._id.toString() } 
      
    } ) 
    )
    
  };

}



export const getStaticProps = async(context) => {

  const meetupId = context.params.meetupId;

  // Establish Connection
  const client = await MongoClient.connect(
    'mongodb+srv://Anish_MB:importMongo@cluster0.3udzw.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne( 
    { _id: ObjectId(meetupId) } 
  );

  client.close();


  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title.toString(),
        image: selectedMeetup.image.toString(),
        address: selectedMeetup.address.toString(),
        description: selectedMeetup.description.toString()
      }
    },
  };


};



export default MeetupDetails;