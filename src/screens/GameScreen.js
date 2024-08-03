import { SafeAreaView, Text } from "react-native";

export default function TopicsScreen() {
  facingMap = {
    0: "down",
    1: "right",
    2: "up",
    3: "left",
  };

  gameMatrix = [
    [1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 2, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ];

  currentFacing = 0;
  currentX = 0;
  currentY = 0;
  destinationX = 3;
  destinationY = 4;

  invalidBoom = false;

  commandList = [
    "Forward",
    "Turn Left",
    "Forward",
    "Turn Right",
    "Forward",
    "BOOM!",
    "Forward",
    "Forward",
    "Turn Left",
    "Forward",
    "Forward",
    // "Forward",
    // "Turn Left",
    // "Forward",
    // "Turn Left",
    // "Forward",
    // "Turn Left",
  ];

  let counter = 0;

  const executeCommands = () => {
    console.log("Commands started");
    console.log("\n");

    const id = setInterval(makeMove, 500);
    function makeMove() {
      if (counter === commandList.length) {
        checkFinalState();
        clearInterval(id);
        return;
      }

      transformSprite(commandList[counter]);
      counter += 1;

      if (!isLegalMove()) {
        console.log("Illegal move! Game ended.");
        clearInterval(id);
      }
    }
  };

  const checkFinalState = () => {
    if (currentX === destinationX && currentY === destinationY) {
      console.log("Success!");
    } else {
      console.log("Failure.");
    }
  };

  const transformSprite = (command) => {
    switch (command) {
      case "Forward":
        console.log("Forward");
        moveForward();
        printPositionAndFacing();
        break;
      case "Turn Left":
        console.log("Turn Left");
        currentFacing += 1;
        currentFacing = currentFacing % 4;
        printPositionAndFacing();
        break;
      case "Turn Right":
        console.log("Turn Right");
        currentFacing += 4;
        currentFacing -= 1;
        currentFacing = currentFacing % 4;
        printPositionAndFacing();
        break;
      case "BOOM!":
        console.log("BOOM!");
        boomBoulder();
        printPositionAndFacing();
        break;
      default:
        console.log("Transform Fucky Wucky");
    }
  };

  const isLegalMove = () => {
    if (
      currentX < 0 ||
      currentX >= gameMatrix[0].length ||
      currentY < 0 ||
      currentY >= gameMatrix.length ||
      gameMatrix[currentY][currentX] != 1 ||
      invalidBoom
    ) {
      return false;
    }
    return true;
  };

  const printPositionAndFacing = () => {
    console.log("Row:", currentY + 1);
    console.log("Column:", currentX + 1);
    console.log("Facing:", facingMap[currentFacing]);
    console.log("\n");
  };

  // A "get forward coordinates" function would have been nice

  const moveForward = () => {
    switch (currentFacing) {
      case 0:
        currentY += 1;
        break;
      case 1:
        currentX += 1;
        break;
      case 2:
        currentY -= 1;
        break;
      case 3:
        currentX -= 1;
        break;
      default:
        console.log("Forward Fucky Wucky");
    }
  };

  const boomBoulder = () => {
    switch (currentFacing) {
      case 0:
        if (
          currentY + 1 >= gameMatrix.length ||
          gameMatrix[currentY + 1][currentX] != 2
        ) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY + 1][currentX] = 1;
        }
        break;
      case 1:
        if (
          currentX + 1 >= gameMatrix[0].length ||
          gameMatrix[currentY][currentX + 1] != 2
        ) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY][currentX + 1] = 1;
        }
        break;
      case 2:
        if (currentY - 1 < 0 || gameMatrix[currentY - 1][currentX] != 2) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY - 1][currentX] = 1;
        }
        break;
      case 2:
        if (currentX - 1 < 0 || gameMatrix[currentY][currentX - 1] != 2) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY][currentX - 1] = 1;
        }
        break;
    }
  };

  executeCommands();

  return (
    <SafeAreaView>
      <Text>Game Goes Here</Text>
    </SafeAreaView>
  );
}
