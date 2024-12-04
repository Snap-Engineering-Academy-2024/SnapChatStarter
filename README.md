# Team Education - Brain Bites

Welcome to Team Education's project repository. Here you will find all the code necessary to run Brain Bites on your device. 

## Why Brain Bites?

We talked with the non-profit program Codetalk and found that individuals often lack exposure to opportunities for gainful employment. Capitalizing off the trend of daily games, we thought it would be game-changing to have daily challenges with an educational twist on Snapchat. When Snapchat is opened, there will be a one-time notification above the chats. The feature will permanently be visible and accessible on the user's profile. When the user opens Brain Bites and taps Learn More, they will be brought immediately to the challenge of the day. 

<img width="200" alt="chat-screen-notification" src="https://github.com/user-attachments/assets/03c7319c-7dbc-4dc6-9fcf-75140bd5a786">

<img width="200" alt="profile-screen-entry" src="https://github.com/user-attachments/assets/c4e40f87-141b-4de9-a934-1478104f459d">

<img width="200" alt="welcome-screen" src="https://github.com/user-attachments/assets/98bbc73f-780b-4570-882d-41cef783aa04">

<img width="200" alt="game-screen" src="https://github.com/user-attachments/assets/dfc584b3-daf3-4edb-bc31-ed2cb6d4b213">

## To Run, Download Expo Go



For [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) on your mobile device  
For [IOS](https://itunes.apple.com/app/apple-store/id982107779) on your mobile device  
For an [Android simulator](https://expo.dev/go?sdkVersion=51&platform=android&device=false) on your laptop device  
For an [IOS simulator](https://expo.dev/go?sdkVersion=51&platform=ios&device=false) on your laptop device  

## To Edit

### Fork the Repository 
Click on the Fork button: This is usually found in the top-right corner of the repository's page. This will create a copy of the repository under your own GitHub account.

### Clone the Forked Repository
1. Go to your forked repository on GitHub.
2. Click on the green "Code" button and copy the URL.
3. Open your terminal or Git Bash and run: 
```js
$ git clone https://github.com/your-username/repository-name.git

```
4. Navigate to the repository directory

## Install Yarn
1. Run the following command to be able to run your program.
```js
$ git yarn install
```

## Set Up the Upstream Remote
1. Add the original repository as a remote: This allows you to pull in updates from the original repository.
```js
$ git remote add upstream https://github.com/Snap-Engineering-Academy-2024/SnapChatStarter.git
```
2. Verify the new remote named 'upstream'

```js
$ git remote -v
```
###  Add Supabase Environment Variable!

Get the code running! You'll need to rename `.env.example` to `.env.local` file. You should be able to reuse the Supabase keys from earlier's week project.
