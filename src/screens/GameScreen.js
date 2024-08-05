import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";

// TO-DO: change commandList to state variable

export default function TopicsScreen() {
  const [spriteStyle, setSpriteStyle] = useState({
    width: "20%",
    height: "20%",
    objectFit: "cover",
    position: "absolute",
    top: "0%",
    left: "0%",
  });

  const [boulderStyle, setBoulderStyle] = useState({
    width: "20%",
    height: "20%",
    objectFit: "cover",
    position: "absolute",
    top: "60%",
    left: "20%",
  });

  const [spriteSource, setSpriteSource] = useState({
    uri: "https://i.ibb.co/YcrywhW/down-arrow.png",
  });

  const [boulderSource, setBoulderSource] = useState({
    uri: "https://i.ibb.co/8jvjV6K/boulder.png",
  });

  facingMap = {
    0: ["down", "v"],
    1: ["right", ">"],
    2: ["up", "^"],
    3: ["left", "<"],
  };

  let facingUrls = [
    "https://i.ibb.co/YcrywhW/down-arrow.png",
    "https://i.ibb.co/1R7t945/right-arrow.png",
    "https://i.ibb.co/3h08ZbC/up-arrow.png",
    "https://i.ibb.co/myvY8wb/left-arrow.png",
  ];

  let gameMatrix = [
    [1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 2, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ];

  let currentFacing = 0;
  let currentX = 0;
  let currentY = 0;
  let destinationX = 3;
  let destinationY = 4;

  let invalidBoom = false;

  let commandList = [];

  let counter = 0;

  const executeCommands = () => {
    currentFacing = 0;
    currentX = 0;
    currentY = 0;
    invalidBoom = false;
    setBoulderStyle({
      width: "20%",
      height: "20%",
      objectFit: "cover",
      position: "absolute",
      top: "60%",
      left: "20%",
    });

    console.log("Commands started");
    console.log("\n");
    renderSprite();

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
        checkFinalState();
        clearInterval(id);
        return;
      }
    }
  };

  const checkFinalState = () => {
    if (currentX === destinationX && currentY === destinationY) {
      console.log("Success!");
    } else {
      console.log("Failure.");
    }

    commandList = [];
  };

  const transformSprite = (command) => {
    switch (command) {
      case "Forward":
        console.log("Forward");
        moveForward();
        renderSprite();
        break;
      case "Turn Left":
        console.log("Turn Left");
        currentFacing += 1;
        currentFacing = currentFacing % 4;
        renderSprite();
        break;
      case "Turn Right":
        console.log("Turn Right");
        currentFacing += 4;
        currentFacing -= 1;
        currentFacing = currentFacing % 4;
        renderSprite();
        break;
      case "BOOM!":
        console.log("BOOM!");
        boomBoulder();
        // renderBoulder(); ?
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
      gameMatrix[currentY][currentX] !== 1 ||
      invalidBoom
    ) {
      return false;
    }
    return true;
  };

  const renderSprite = () => {
    let objCopy = { ...spriteStyle };
    newLeft = 20 * currentX;
    newTop = 20 * currentY;
    objCopy.left = newLeft + "%";
    objCopy.top = newTop + "%";
    setSpriteStyle(objCopy);
    setSpriteSource({
      uri: facingUrls[currentFacing],
    });
  };

  // const printPositionAndFacing = () => {
  // console.log("Row:", currentY + 1);
  // console.log("Column:", currentX + 1);
  // console.log("Facing:", facingMap[currentFacing][0]);
  // console.log("\n");

  //   console.clear();
  //   let prevItem = gameMatrix[currentY][currentX];
  //   gameMatrix[currentY][currentX] = facingMap[currentFacing][1];

  //   gameMatrix.forEach((element) => {
  //     console.log(element.join(""));
  //   });

  //   console.log("\n");

  //   gameMatrix[currentY][currentX] = prevItem;
  // };

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
          gameMatrix[currentY + 1][currentX] !== 2
        ) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY + 1][currentX] = 1;
        }
        break;
      case 1:
        if (
          currentX + 1 >= gameMatrix[0].length ||
          gameMatrix[currentY][currentX + 1] !== 2
        ) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY][currentX + 1] = 1;
        }
        break;
      case 3:
        if (currentY - 1 < 0 || gameMatrix[currentY - 1][currentX] !== 2) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY - 1][currentX] = 1;
        }
        break;
      case 2:
        if (currentX - 1 < 0 || gameMatrix[currentY][currentX - 1] !== 2) {
          invalidBoom = true;
        } else {
          gameMatrix[currentY][currentX - 1] = 1;
        }
        break;
      default:
        console.log("Boom Fucky Wucky");
    }

    if (!invalidBoom) {
      setBoulderStyle({});
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          commandList.push("Forward");
          console.log(commandList);
        }}
      >
        <Text style={styles.textStyle}>Forward</Text>
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          commandList.push("BOOM!");
          console.log(commandList);
        }}
      >
        <Text style={styles.textStyle}>BOOM!</Text>
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          commandList.push("Turn Left");
          console.log(commandList);
        }}
      >
        <Text style={styles.textStyle}>Turn Left</Text>
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          commandList.push("Turn Right");
          console.log(commandList);
        }}
      >
        <Text style={styles.textStyle}>Turn Right</Text>
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          executeCommands();
        }}
      >
        <Text style={styles.textStyle}>Start</Text>
      </Pressable>
      <View style={styles.canvas}>
        <Image
          style={styles.img}
          source={{
            uri: "https://i.ibb.co/6X7BVBT/sample-path.png",
          }}
        />
        <Image style={spriteStyle} source={spriteSource} />
        <Image style={boulderStyle} source={boulderSource} />
      </View>
      <ScrollView>
        {commandList.map((element) => (
          <Text>{element}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    position: "relative",
    width: "75%",
    height: "50%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.25,
  },
});
