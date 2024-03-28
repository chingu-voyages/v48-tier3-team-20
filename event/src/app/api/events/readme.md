List of API routes for reference

## Users

Existing:
loginUser - POST /api/users/login
registerUser - POST /api/users/register

Todo:
logoutUser - POST /api/users/logout (currently simple GET for testing)

To consider:
updateFullname
updateProfilePicture
updateIsSubscribed
updatePassword
getUserPublicData (interest, bio, etc)

## Events

Todo (subject to change):

For host dashboard:
createEvent - POST /api/events
updateEvent - PUT /api/events/[eventid]
deleteEvent - DELETE /api/events/[eventid]

Get individual event by id:
getEventById - GET /api/events/[eventid]

Get list of categories/locations/hosts (and a few featured events?):
getEventCategories - GET /api/events/category
getEventLocations - GET /api/events/location (nice to have)
getEventHosts - GET /api/events/host

Note: To update location to separate online/offline, country, city, address
Note: May need a separate collection to store list of categories

Get list of events:
getEventsByCategory - GET /api/events/category/[category]
getEventsByLocation - GET /api/events/location/[location]
getEventsByDate - GET /api/events/date/[date]
getEventsByHost - GET /api/events/host/[hostid]
getEventsByUser - GET /api/events/user/[userid]

Search events:
searchEvents - GET /api/events/search?q={query}

For logged in users:
joinEvent - PUT /api/events/join/[eventid]
leaveEvent - PUT /api/events/leave/[eventid]
reportEvent - POST /api/events/report/[eventid] (nice to have, to do later)

Note: To create new collection or update event schema for event reporting
