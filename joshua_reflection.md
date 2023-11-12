# Reflection by Joshua on the frontend

I mainly worked on the frontend configuration to make sure it can communicate with the backend. I also worked on the map feature

## Things I learned
- Router and Single Page Application. I learned about the how a single page application works and routers as it pertains to frontend web applications
- Using Cropper JS to let user crop their image into a square before sending to the backend
- Using leafletJS to display markers based on data given by backend. Leaflet has a bug where if the markers are modified, the markers would freeze on the screen. To overcome this, the map instance is destroyed and recreated when new data needs to be displayed

## Things to improve on
- Loading times are significant, especially when deployed, this is due to a page requiring at most 3 API calls (e.g. Home page). In the future, API calls should be reworked to fit the needs of the frontend application
- Animation is not included. It was tested, however it did not work. It is only implemented in the frontend page I suspect this is because when data is added, the DOM nodes are merely updated. In the future, I can work the websites so that the components only show up when it is finally loaded, thus the animation will work as intended.
- Using sub-routes. The current implementation do not use sub-routes. In the future, similar pages (e.g. item edit/view) should be grouped together under one parent route to allow for code reuse
