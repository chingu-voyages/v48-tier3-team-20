# Event App

A chingu app by team 20

## List of FE routes for reference

Todo (subject to change, feel free to edit/improve):

Root layout contains `<Header/>` and `<Footer/>`, to add context providers?

### Public routes [Public]

- Home: `/`
  - Contains `<SearchBar/>` which links to `/search`
  - Contains `Trending` and `Upcoming` which links to `/trending` and `/upcoming`
  - Contains `See all catogories` which links to `/category`
- Login (login and signup together): `/login`
  - Middleware check: Redirects to `/dashboard` if user already logged in
- Individual event: /`events/[eventid]`
  - Links to `/category/[category]` if clicked on category
  - Links to `/host/[hostid]` if clicked on host name
  - Able to click join/leave on event page, no redirects, just popup/modal
- List of all categories (with some featured events): `/category`
  - Contains a link to every category `/category/[category]`
- List of all public events by category (paginated? infinite? sort/filter?): `/category/[category]`
- List of all public events by host (paginated? infinite? sort/filter?): `/host/[hostid]`
- Search event: `/search`
- Trending event: `/trending`
- Upcoming event: `/upcoming`
- About: `/about`

### User routes [Require Login]

Middleware check: Redirects to `/login` if not logged in

- Dashboard: `/dashboard`
  - Shows list of upcoming events the user has joined, and list of past events
  - Shows some recommendations based on interest or popularity
  - Copy/reuse `/`, basically the same but with user specific data?
- Upcoming events: `/dashboard/upcoming`
- Past events (already attended): `/dashboard/past`
- User profile for logged in user: `/profile`
- Other host/user public profile: `/profile/[userid]`
- Logout: `/logout`

### Host routes [Require Host Login]

Middleware check: Redirects to `/login` if not logged in, ~~shows `401 Unauthorized`~~ redirects to `/dashboard` if user is not host

- Event Management: `/host/events`
  - Shows list of all events with links to `/host/[eventid]` to edit event
  - Contains a delete button to delete event (with confirmation popup)
  - Shows a create event form and button to create new events
- Upcoming events: `/host/upcoming`
- Past events (already over): `/host/past`
- Edit Event (update and delete): `/host/[eventid]`

## List of BE routes for reference

Todo (subject to change, feel free to edit/improve):

### Users

Existing:

- loginUser: `POST /api/users/login`
- registerUser: `POST /api/users/register`

Todo:

- logoutUser: `POST /api/users/logout`

To consider:

- updateUserData (one endpoint for everything or separate?): `PUT /api/users/[userid]`
- updateProfilePicture
- updateIsSubscribed
- updatePassword
- forgetPassword (nice to have?)
- getUserPublicData (interest, bio, etc): `GET /api/users/[userid]`

### Events

For host dashboard [Require Host Login]:

- createEvent: `POST /api/events`
- updateEvent: `PUT /api/events/[eventid]`
- deleteEvent: `DELETE /api/events/[eventid]`
- getHostEvents: `GET /api/events/host/[hostid]` (return error if hostid is not a host, include private events only if logged in user matches hostid, else return public events only)

Get individual event by id [Public]:

- getEventById: `GET /api/events/[eventid]`

Get list of categories/locations/hosts (and a few featured events?) [Public]:

- getEventCategories: `GET /api/events/category`
- getEventLocations: `GET /api/events/location` (nice to have)
- getEventHosts: `GET /api/events/host` (nice to have)

Note: To update location to separate online/offline, country, city, address
Note: May need a separate collection to store list of categories
Note: To implement public/private events? (nice to have)

Get list of events [Public]:

- getEventsByCategory: `GET /api/events/category/[category]`
- getEventsByLocation: `GET /api/events/location/[location]`
- getEventsByDate: `GET /api/events/date/[date]`
- getEventsByHost: `GET /api/events/host/[hostid]` (return error if hostid is not a host, return public events only, include private events only if logged in user matches hostid)
- getUpcomingEvents?: `GET /api/events/upcoming`
- getTrendingEvents?: `GET /api/events/trending`

Search events [Public]:

- searchEvents: `GET /api/events/search?q={query}`

For logged in users [Require Login]:

- joinEvent: `PUT /api/events/join/[eventid]`
- leaveEvent: `PUT /api/events/leave/[eventid]`
- getEventsByUser: `GET /api/events/user/[userid]` (return 401 unauthorized if logged in user is not userid, return events the logged in user has joined)
- reportEvent: `POST /api/events/report/[eventid]` (nice to have, to do later)

Note: To create new collection or update event schema for event reporting
