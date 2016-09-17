# Good or Bad Images
Angular2 frontend to do training on images.

## ♫ What is it good for?
(♫ absolutely nothing ♫)
A friend asked to make a traning app that would help her train people. So why not practice doing it with her requirement.

## Flow
### Backend: [Node with Postgres](https://github.com/MatMath/secureNodeForPostgres)
### Page 1: generic home.
At this level the user should already be loggued-in via Google & Passport (or else).

### Page 1.1: Main Test
Algo: Randomize the selection on only img the user never saw. (this is done in Postgres directly)
The user will have a 1 images to inspect at the time
- List of Y criteria/defect to select from.
- Multiple item can be selected. All required item need to be selected to succede the images. (Ranges??? Optional???)
- TODO: Each images can have a Wiki/reference link to learn from.
- The page will have a comment box at the bottom for the user to input comments.
- When submit it will tell you if it was good or wrong.
- TODO: If wrong a button will be there to contest the default img value (reason), or simply click "next".
Data To Save:
- Time between open and Submit
- Good Fail or Failed Good img
- What was missing in the defect
- What was extra in the defect
- Comments on the img.
- How far from the target the user was?
- TODO: Was the Decision contested.

Page 2: Analytics
Page 3: Master page where we can upload img, add reason + (Target/Range), add link, OR Modify existing img ranges.


## Analytics
### Trainee Analytics:
- Nbr of images checked.
- Fail rate on Good images
- Fail rate on Bad images
- Top 3 problematic decision (added or missing).
- Average inspection time vs other.
- Graph of success rate split in 100 img since the start.
- Calender view of his progress (% success vs NbrPer day D3?)

### Trainer Analytics:
- Success rate on Bad images.
- Success rate on Good images.
- Images that is mostly mistaken.
- Images that were Contested by trainee + All reason listed of all user. --> need username + Text + All missing or extra item.
- Reason that fail the most.
- Average time for inspection per user.
- Total system Good img vs Bad img.
- Total system Nbr Error 1, 2, 3, 4...
- Calender view of all user progress (% success vs NbrPer day D3?).

## Technology
- Angular2
- Node backend secured with Passeport.
- Postgresql
- D3 for Analytic?


## Installation
npm install
npm test
npm run

## Usage


## License
MIT


If they fail a img should the img be re-integrated in the system or never showned?
