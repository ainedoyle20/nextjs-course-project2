import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-utils';

import EventContent from '../../components/event-detail/event-content';

function SpecificEventPage(props) {
    const {specificEvent} = props;

    if (!specificEvent) {
        return <div className="center"><p>Loading...</p></div>
    }
    
    return (
        <Fragment>
            <EventSummary title={specificEvent.title} />
            <EventLogistics date={specificEvent.date} address={specificEvent.location} image={specificEvent.image} imageAlt={specificEvent.title}/>
            <EventContent>
                <p>{specificEvent.description}</p>
            </EventContent>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const { params } = context;
    const eventId = params.id;

    const specificEvent = await getEventById(eventId);

    if (!specificEvent) {
        return {notFound: true};
    }

    return {
        props: {
            specificEvent,
        },
        revalidate: 30,
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    let ids = events.map(event => event.id);

    const pathsWithParams = ids.map(id => ({ params: { id }}));

    return {
        paths: pathsWithParams,
        fallback: true,
    }
}

export default SpecificEventPage;
