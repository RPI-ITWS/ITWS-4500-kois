In Lab 2, the missing delete function has been completed. Now it's possible to delete articles using their ID, but only the ones created by the user and not the ones that were already there.

For Lab 3, I chose to use the weather and map APIs, as I had experience with them from last semester. However, the map isn't a JSON file, so I only referenced its latitude and longitude. This website retrieves the map location and weather condition by searching for city names and records them in a local history file. When there's no existing file locally, it automatically creates one. POST and DELETE are used for manipulating the history records, as I couldn't figure out how to integrate them into Lab 2. PUT wasn't used in the new Lab 3, as modifying history records seemed odd, and I didn't come up with a way to utilize this function.

DELETE removes the history record file, demonstrating the usefulness of the automatic file creation feature.

https://nodejs.org/en/docs/
https://expressjs.com/en/starter/installing.html
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://developer.mozilla.org
