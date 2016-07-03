# Good or Bad Images
Angular2 frontend to do training on images.

## ♫ What is it good for?
(♫ absolutely nothing ♫)
A friend asked to make a tranning app that would help her train people. So why not practice doing it with her requirement. 

## Flow
### Page 1: Auth + What to do Box.
The user will login with his user.

### Page 1.1: Main Test
Algo: Randomize the selection on only img the user never saw. 
The user will have a sequence of X images to inspect and a list of Y item to select from. 
	- Multiple item can be selected. All required item need to be selected to succede the images. (Ranges??? Optional???)
Each images can have a Wiki/reference link to learn from.
The page will have a comment box at the bottom for the user to input comments. 
When submit it will tell you if it was good or wrong. 
If wrong a button will be there to contest the default img value (reason), or simply click "next".
Data To Save: 
	- Time between open and Submit
	- Good Fail or Failed Good img
	- What was missing in the defect
	- What was extra in the defect
	- Was the Decision contested. 
	- Comments on the img.
	- How far from the target the user was?

Page 2: Analytics
Page 3: Master page where we can upload img, add reason + (Target/Range), add link, OR Modify existing img ranges. 


## Analytics
### Trainee Analytics:
Nbr of images checked.
Fail rate on Good images
Fail rate on Bad images
Top 3 problematic decision (added or missing).
Average inspection time vs other. 
Graph of success rate split in 100 img since the start.
Calender view of his progress (% succes vs NbrPer day D3?)

### Trainer Analytics:
Success rate on Bad images.
Success rate on Good images.
Images that is mostly mistaked.
Images that were Contested by trainee + All reason listed of all user. --> need username + Text + All missing or extra item.
Reason that fail the most.
Average time for inspection per user.
Total system Good img vs Bad img.
Total system Nbr Error 1, 2, 3, 4... 
Calender view of all user progress (% succes vs NbrPer day D3?).

## Technology
- Angular2
- Postgresql
	- Table of userg
	- Table of Golden sample: Name + Url + Range for each checkpoint + Pass-Fail Type.
	- Table of reviews: UserID + Img ID (Good / Bad images ?) + Extra Failed reason + Missing reason + Comments.
- OAuth2 based on lotAuth
- D3 for Analytic?


## Installation
npm install
npm run

## Usage


## License
MIT



Issue to make: List type of defect that can be found in a images.
If they fail a img should the img be re-integrated in the system or never showned?
Defect with range?
Dropbox/GDrive of 100 Golden Sample img to start with.
Look at ST API to see what I can tap into. 
Q: With SQL Type structure, where we keep the user preferences?

Step1: make a API server Node + PostGresql.