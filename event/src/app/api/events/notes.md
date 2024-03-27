List of API routes for reference

## Users

loginUser - POST /api/users/login
registerUser - POST /api/users/register

Nice to have:
updateFullname
updateProfilePicture
updateIsSubscribed
updatePassword
getUserPublicData (interest, bio, etc)

## Events

Get individual event by id or slug:
getEventById - GET /api/events/id
getEventBySlug - GET /api/events

Get list of events:
getEventByCategory - GET /api/events/category
getEventByLocation - GET /api/events/location
getEventByDate - GET /api/events/date
getEventByHost - GET /api/events/host
getEventByUser - GET /api/events/user

Get list of categories (and featured events?):
getEventCategories - GET /api/events/categories

Search events:
searchEvents - GET /api/events/search

For host dashboard:
createEvent - POST /api/events/create
updateEvent - PUT /api/events/update
deleteEvent - DELETE /api/events/delete

For logged in users:
joinEvent - PUT /api/events/join
leaveEvent - PUT /api/events/leave
reportEvent - PUT /api/events/report
