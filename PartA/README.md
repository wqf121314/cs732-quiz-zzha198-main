# CS732 / SE750 Quiz - S1 2022 - Part A

For this part of the quiz, you will complete a simple MERN-stack application - a TODO list - by following the steps
below. You may add and use any `npm` packages you like in answering this quiz, as well as code from various sources such
as this course's material and StackOverflow - as long as you **cite the source of the code in a comment**. You may
modify the existing code in any way, except that you **must not remove any code
from [`backend/src/server.js](./backend/src/server.js)** (you may add to it if required).

This part of the quiz is marked out of a total of **30 points** and is worth **50%** of the total grade for the quiz.
The number of points for each step is given in square brackets in the header of each step.

## Introduction

To run the application, follow these steps:

1. Install all frontend and backend dependencies
2. Ensure you have [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine
3. Run `init-db` on the backend
4. Run the backend and frontend

You will be presented with an extremely simple full-stack template app, which you will modify and extend below. Start by
reading and understanding the exising code. Then, move onto step one.

**Note:** One thing to note are the  `start-with-random-errors` and `start-with-delays` scripts defined
in [`backend/package.json`](./backend/package.json), which you can run. When running in these modes, all requests to the
server may randomly throw `500` HTTP server errors rather than being successful, and / or may randomly take longer to
complete. This will be important later, for testing purposes. These scripts are facilitated by the middleware on
lines `12` to `34` in `server.js`.

## Step one - Database schema [3 marks]

To begin, in a new file in `backend/src/db`, create a database schema to store todo items. In addition to the
built-in `_id`, todo items should also have the following properties:

- Description (string)
- Completed status (boolean)
- Due date (date, or other appropriate representation)

Once you've created your schema, modify `init-db.js` to clear all existing todos in its `clearDatabase()` function, and
add a couple of items of test data in the `addData()` function.

Run `init-db` to make sure there are no errors, and browse your MongoDB instance to ensure the test data was added
correctly ([MongoDB Compass](https://www.mongodb.com/products/compass) is a great tool for this).

## Step two - REST service [5 marks]

Continuing on with our backend code, create a REST service to interact with the todo items stored in our database. All
code for this step should be placed in an appropriate file within the `backend/src/routes` directory.

The definition of the REST service required is as follows:

1. `GET /api/todos`: returns a `200` response with a list of all todo items in the database.

2. `GET /api/todos/{id}`: returns a `200` response with the single todo item with the given `id` if it exists, or
   a `404` response if that todo does not exist.

3. `POST /api/todos`: Receives a new todo item in the request body (consisting of a description, completed status, and
   due date - *NOT including the id, which is to be created by the backend*), and adds it to the database. If
   successful, returns a `201` response with a `Location` header set to the new todo item's URI, as per #2 above. If a
   failure occurs, an appropriate `4XX` or `5XX` response should be returned.

4. `PUT /api/todos/{id}`: Updates an existing todo item. If a todo with the given id exists, its description, completed
   status, and due date should be updated according to the data contained within the request body, and a `204` response
   should be returned. If not, a `404` response should be returned.

5. `DELETE /api/todos/{id}`: Deletes the todo with the given id, if it exists. Returns a `204` response regardless of
   whether any todo item was actually deleted.

While developing the REST api, we encourage testing to ensure it is functioning correctly (though testing is not
required to earn marks). This can be done either with the testing frameworks covered in lectures, or with a tool
like [Postman](https://www.postman.com/).

## Step three - Simple frontend [4 marks]

For the remaining steps, we build the React frontend. For this step, in `frontend/src/App.js`, remove the existing UI
from the given template app, and replace it with a UI which shows a list of todo items. The requirements for this UI are
as follows (note that none of these include styling - *you need not spend time making your app look "pretty" at this
point*):

1. The UI should source its list of todo items from one of your REST API endpoints, as appropriate.

2. While loading, some kind of "loading" indicator (e.g. a progress bar or simply the text "Loading...") should be
   displayed.

3. If loading fails, an error message should be displayed - but any exising todo items already in the client app's state
   should continue to be displayed.

4. If loading is successful, the list of todos should be displayed. Each todo's description, completed status, and due
   date should be displayed. Dates should be formatted nicely.

For this and following steps, **make sure you appropriately break your UI down into components. Don't have one
giant `App` component - that will definitely cost you marks!**

**Hints:**

- To more easily test the "loading" or "error" states, you can start the backend with the `start-with-random-errors`
  or `start-with-delays` scripts. These will be helpful for future steps, too.

- [`dayjs`](https://day.js.org/) is included on both the frontend and backend, for easier date handling / formatting.

## Step four - Adding todos [3 marks]

Extend your UI from step three to add the ability to create new todo items. This can be as simple as two inputs where
users can enter a description and due date, plus an "add" button. When the user types a new description and clicks "add"
, the following should occur:

1. The new todo (with default completed status set to false) should be sent to the backend, using one of your REST API
   endpoints as appropriate.

2. While sending, some indication should be displayed to inform the user that the new todo is being sent.

3. If the new todo is added successfully, it should then be added to the main todo list, and the description &amp;
   due-date inputs should be cleared.

4. If there is an error adding the todo, an appropriate error message should be displayed.

## Step five - Completing todos [4 marks]

Extend your UI from step four to allow a todo item's completed status to be toggled. Whenever the user toggles the
completed status on the client, the following should occur:

1. The client should *immediately* update to indicate the new completed status - i.e. it should *optimistically* assume
   that the server request to update the todo will succeed.

2. A request to update the todo should be made to one of your REST endpoints, as appropriate.

3. While the request is ongoing, some indication should be displayed to the user.

4. If the request succeeds, we don't need to make any further changes, since we already optimistically assumed the
   request would succeed.

5. If the request fails, the todo item's completed status should be reverted back to what it was before, and an
   appropriate error message should be displayed.

## Step six - Deleting todos [3 marks]

Extend your UI to allow todo items to be deleted. Each todo item should be displayed with a "delete" button or similar,
which, when clicked:

1. Sends a request to an appropriate REST endpoint

2. Displays a notification to the user while the delete request is ongoing

3. Displays an error message if the delete failed

4. Removes the todo from the list if the delete succeeds.

## Step seven - Something extra [4 marks]

Extend your UI one more time by adding something extra. This should be something relatively small, and shouldn't take
you longer than about 20 minutes to complete. Some ideas include:

1. Proper styling (needs to look very professional to be considered equal to these other points below)
2. Offline capability
3. Ability to edit todos' descriptions as well as their completed status - with appropriate usability (for example, if
   the user types a new description, then the update request fails, and the UI reverts the description back to the old
   one, that would be an example of *poor* usability because the user's changes were erased).
4. Ability to sort todos by due date

## Step eight - Report [4 marks]

In the space below, describe what you have done for each step above, in order to complete your implementation. In
particular:

1. How have you implemented each step? Why did you do it that way?
2. Have you used any external packages? Where? Why?
3. What is the extra something you have added for step seven? How long did it take you to implement?

Two or three sentences maximum per step should be appropriate.

### Your response here:

- Step one - Database schema

This step was relatively simple, I simply defined the todo object and then did the random data generation via dummyjson
again. In generating the content of the random description, I used {lorem min=10 max=20} to complete the random
description.

- Step two - REST service

When working on the backend service development, I originally intended to use the KOA framework for this, but when I
found out that the Express framework was required. I encapsulated all the methods of the dao layer in todo objects, so I
only did some global definitions of request parameters and return status in the router. When testing the router, I did a
simple interface test using postman.

```shell
curl --location --request POST 'localhost:3001/api/todos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description":"bbbbbbbbb",
    "status":false,
    "deadline":"2022-06-04T09:54:22.000Z"
}'

curl --location --request PUT 'localhost:3001/api/todos/628493384b446d3fb19e091d' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description":"aaaaa",
    "status":true,
    "deadline":"2022-06-04T09:54:22.000Z"
}'

curl --location --request DELETE 'http://localhost:3001/api/todos/6283c6293bf88a382b996c00'
```

- Step three - Simple frontend

I added a Loading component to the initialisation of the whole project to prevent problems with loading too long at data
time causing the user to be unaware. I also used the serviceWorkerRegistration method to prevent the front-end from
being able to temporarily store data when the back-end service is unavailable. For the display of todo content, I used
the list component of antd to implement the data display.

- Step four - Adding todos

For the add todo function, I use Antd's Modal component to render a dialog box on the page and then complete the
addition through this dialog box. More specifically, I control the logic for displaying this dialog via the onClick
event of the button. When the dialog is displayed, I then handle the data submission action via the Modal's onOk
function. In addition, I have added a message alert about the success or failure of the data creation.

- Step five - Completing todos

There are only two update status for todo: completed and incomplete. Therefore, I thought the switch component would
meet the requirement. The default value of the component can be obtained on request, and when the switch component is
clicked (triggering the onclick event) I call updateTodo to change the status of the todo. Then, as with the added
functionality, I also added a message alert.

- Step six - Deleting todos

For the deletion of todo's, I added a DelTodo component to the extended actions of antd's list component to enable the
deletion of each todo. When the button is clicked, it triggers the deleteTodo component, which then calls the backend to
perform the deletion. Similarly, I have added message alerts.

- Step seven - Something extra

In the development of the back-end service, I spent about an hour completing all the functionality on the back-end and
testing it for completeness. I have added sorting logic based on deadlines to the todo-dao method. This sorting
capability should be controlled by the front end if there is enough time.

I spent more than 5 hours on the development part of the front-end service. In the development of the front-end pages I
used many components of Antd to make the project more comfortable in terms of functionality and presentation.
Specifically, the Todo list was created using antd's list component, which also contains paging functionality. In the
todo.description component, I control the presentation and editing via some properties of the TextArea component. For
example, when the user clicks on the TextArea component it triggers the edit function and when the TextArea loses focus
it compares whether the content of the description has changed and submits an updateTodo if it has. in the time
component I have also used antd's DatePicker for the display and modification of deadlines.

Finally, I couldn't stand it when the front-end service was stupidly waiting while the back-end service was throwing an
exception. So I looked into the retry mechanism of axios and used the retry capability in my project, where there are 5
retries when a request fails. Due to time constraints I could only simply stack the functionality and hope to have the
opportunity to optimise it in the future.