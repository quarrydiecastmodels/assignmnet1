# Assignment

## Git Documentation:
	
	The layout of the git repository is fairly straight forward. The user clicks on the folder called "assignment" to view to the work


## Data Structures:
	
	Users are fetched using the JQuery Ajax method.
	They are then stored inside an array and then pushed to the screen with retrieved

	Logged in users have their username and email saved to localstorage.
	When they sign out, localstorage is cleared

	No other data structures are used for groups.

## Angular Architecture

	The components define what view is being displayed to the screen.
	Modules are used to import functionalities from other component pages
	
	```mermaid
	sequenceDiagram
	Alice ->> Bob: Hello Bob, how are you?
	Bob-->>John: How about you John?
	Bob--x Alice: I am good thanks!
	Bob-x John: I am good thanks!
	Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

	Bob-->Alice: Checking with John...
	Alice->John: Yes... John, how are you?
	```



