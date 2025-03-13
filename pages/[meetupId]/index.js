import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://user131:QiIyK3HL2SPqPIFw@cluster0.tku7b.mongodb.net/mtps"
  );
  const db = client.db();
  const meetupCollections = db.collection("mtps");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetpId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://user131:QiIyK3HL2SPqPIFw@cluster0.tku7b.mongodb.net/mtps"
  );
  const db = client.db();
  const meetupCollections = db.collection("mtps");

  const selectedMeetup = await meetupCollections.findOne({
    _id: new ObjectId(meetpId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
