# Final Project Starter

This will be the starter code for your final project! But first, we're going to spend a day making improvements to it. We'll use pull requests to manage this, and for that you'll need to be on your own branch. You can work in pairs or on your own.

## 1. Create your branch

After cloning this repo to your computer, **make a new branch** with your name! All of your changes need to be on this branch.

![image](https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/7607483/419f0449-412f-4f77-851b-979ac56b7122)

## 2. Add firebase config and Explore!

Get the code running! You'll need to add a `firebase.js` file. You should be able to use the exact some one you used in your snapchatbots project.

## 3. Improve the starter code

Pick something you want to fix/add about the starter code, put it in the Slack and work on it! Use slack to make sure we don't have too much overlap, but you can always collaborate with others if you both want to work on the same thing!

## 4. Create your pull request

<details>
<summary>OPEN ME! Many Screenshots Inside</summary>

### A - Add and Commit your changes locally
  
![commit changes](https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/7607483/f5ebd117-81b8-4b21-82eb-b3eacd365caf)

### B - Push your changes

![push changes](https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/7607483/eb851dda-2c79-4b97-ac9a-844c4787e7ba)

### C - View and starting creating your pull request on Github

![start creating pull request](https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/7607483/a5771ba6-a3d1-4bc1-ae13-2ae25f716aed)

### D - Describe your pull request

![describe pull request](https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/7607483/b608c668-b48a-4f2f-b007-a28dbc8e89a0)

In your pull request, please be specific about what updates you have added. The header should summarize the main fixes that your edits address and your comment
should include specific details of exactly what was changed. Please include screenshots of the edited screen before and after your changes. Here is a great 
example from Felicia.
<img width="1065" alt="image" src="https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/74020035/12043923-5cd6-4085-a285-d8ec64fd8c43">


### F - View your created pull request

![view created pull request](https://github.com/Snap-Engineering-Academy-2023/snapchat-starter/assets/7607483/967d52d6-15e5-4920-9cc2-53c06872bfc5)

</details>

<br/>

<br/>

## 5. Review and Merge your changes

After you've created a pull request, it can merged into the main branch!

The instructors will likely handle most of this process, consulting with the creator of each pull request as needed.

<br/>

<br/>

## 6. Making your own fork
<details>
<summary>Baker needs to add to this with his slack messages</summary>

</details>

<br/>

<br/>

<details>
<summary>Notes for upgrading Expo and Firebase</summary>

This is mostly meant for instructors in future years, but scholars may use too.

Updating Expo to the latest minor version changes (e.g. `49.0.0` to `49.0.6`) can be done with:

```console
yarn add expo@latest
```

Updating firebase to the latest version (major or minor, e.g. `9.9.1` to `10.1.0`) is done with:

```console
yarn expo install firebase@latest
```

After doing either of these, it also seems to be good practice to run `yarn expo install --fix`

If Expo needs a major version update, that needs to be done manually and incrementally. (e.g. separate steps for `47.X.X`>`48.X.X` and `48.X.X`>`49.X.X`) See this link: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

*Baker and Jenna in 2023 were able to do major version updates with that process without having to make a brand new expo project, which is nice. (When updating the React starter code, it was easier to make a whole new project and copy files in)*

</details>
