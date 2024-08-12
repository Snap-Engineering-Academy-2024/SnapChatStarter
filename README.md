# Team Education - Brain Bites

Welcome to Team Education's project repository. Here you will find all the code necessary to run Brain Bites on your device. 

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
