import { getFeaturedEvents } from '../helpers/api-utils';

import EventList from "../components/events/event-list";

function HomePage(props) {
  return (
    <div>
      <EventList events={props.featuredEvents}/>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage;
