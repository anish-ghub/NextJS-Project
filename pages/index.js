// our-domain.com/

import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';



const HomePage = (props) => {
    return (
        <div>

            <Head>
                <title>React MeetUp</title>
                <meta 
                    name="description" 
                    content="Browswe a huge List of highly active React MeetUp!"
                />
            </Head>

            {/* Expects meetups props (id, image, title, address) */}
            <MeetupList   
                meetups = {props.meetups}
            />

        </div>
    );
};




// Only works Components in the pages
// Calls before the Component Function HomePage
// Execute on the Build Process not on the Client Side
export const getStaticProps = async() =>{

    // Fetch data from API
    const client = await MongoClient.connect(
        'mongodb+srv://Anish_MB:importMongo@cluster0.3udzw.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();


    return {
        props:{
            meetups:meetups.map( meetup => ( {
                id:meetup._id.toString(),
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                description:meetup.description
            } )
            )
        },
        revalidate: 1 //1 sec next.js wait 
        // In every 1 sec Page will be regenerated on Server
    };
};



export default HomePage;









// Run always on the Server after Build Process
// For Every Incoming request the page will regenerate
// export const getServerSideProps = async(context) =>{

//     const req = context.req;
//     const res = context.res;

//     //Fetch data from API

//     return{
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };
