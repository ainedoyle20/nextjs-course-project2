import { Fragment } from "react";
import { useRouter } from "next/router"; 

import {getAllEvents} from '../../helpers/api-utils';
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function EventsPage(props) {
    const router = useRouter();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList events={props.allEvents} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const allEvents = await getAllEvents();

    return {
        props: {
            allEvents: allEvents,
        },
        revalidate: 60,
    }
}

export default EventsPage;
