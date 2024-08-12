import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import Timer from "../components/Timer.js";
import LottieView from "lottie-react-native";

// TO-DO: Hint tray
// TO-DO: Boom image

export default function TopicsScreen() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleStart();
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const [spriteStyle, setSpriteStyle] = useState({
    width: "20%",
    height: "20%",
    objectFit: "cover",
    position: "absolute",
    top: "0%",
    left: "0%",
  });

  const [arrowStyle, setArrowStyle] = useState({
    width: "20%",
    height: "20%",
    objectFit: "cover",
    position: "absolute",
    opacity: 0.5,
    top: "20%",
    left: "0%",
  });

  const [boulderStyle, setBoulderStyle] = useState({
    width: "20%",
    height: "20%",
    objectFit: "cover",
    position: "absolute",
    top: "60%",
    left: "19%",
  });

  const [spriteSource, setSpriteSource] = useState({
    uri: "https://i.ibb.co/Ms4Xvyb/star-pixel.png",
  });

  const [arrowSource, setArrowSource] = useState({
    uri: "https://i.imgur.com/EMj6p2q.png",
  });

  const [playStyle, setPlayStyle] = useState({
    width: "33%",
    height: "39%",
    position: "absolute",
    top: "59%",
    left: "64%",
  });
  const [forwardStyle, setForwardStyle] = useState({ opacity: 1 });
  const [rightStyle, setRightStyle] = useState({ opacity: 1 });
  const [leftStyle, setLeftStyle] = useState({ opacity: 1 });
  const [boomStyle, setBoomStyle] = useState({ opacity: 1 });

  const [gameComplete, setGameComplete] = useState(false);

  let facingUrls = [
    "https://i.imgur.com/EMj6p2q.png",
    "https://i.imgur.com/YZl0Xpt.png",
    "https://i.imgur.com/7t5aiJg.png",
    "https://i.imgur.com/hpQeB4k.png",
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

  const [printableCommandList, setPrintableCommandList] = useState([]);

  let counter = 0;

  const executeCommands = () => {
    currentFacing = 0;
    currentX = 0;
    currentY = 0;
    invalidBoom = false;

    console.log("Commands started");
    console.log("\n");
    renderSprite();

    const id = setInterval(makeMove, 500);
    function makeMove() {
      if (counter === printableCommandList.length) {
        checkFinalState();
        clearInterval(id);
        return;
      }

      transformSprite(printableCommandList[counter]);
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
      handlePauseResume();
      setGameComplete(true);
      setTimeout(() => {
        setGameComplete(false);
      }, 3500);
    } else {
      setBoulderStyle({
        width: "20%",
        height: "20%",
        objectFit: "cover",
        position: "absolute",
        top: "60%",
        left: "19%",
      });
      console.log("Failure.");
      setPrintableCommandList([]);
    }
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

    // Set facing arrow
    setArrowSource({
      uri: facingUrls[currentFacing],
    });

    let arrowObjCopy = { ...arrowStyle };
    switch (currentFacing) {
      case 0:
        arrowObjCopy.left = 20 * currentX + "%";
        arrowObjCopy.top = 20 * (currentY + 1) + "%";
        break;
      case 1:
        arrowObjCopy.left = 20 * (currentX + 1) + "%";
        arrowObjCopy.top = 20 * currentY + "%";
        break;
      case 2:
        arrowObjCopy.left = 20 * currentX + "%";
        arrowObjCopy.top = 20 * (currentY - 1) + "%";
        break;
      case 3:
        arrowObjCopy.left = 20 * (currentX - 1) + "%";
        arrowObjCopy.top = 20 * currentY + "%";
        break;
      default:
        console.log("Arrow Fucky Wucky");
    }

    setArrowStyle(arrowObjCopy);
  };

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
    <View style={[styles.container]}>
      {/* Text Area */}
      <View style={{ alignItems: "left", width: 375, marginTop: -35 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.chillahChallenge}>Chillah's Challenge</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 20, height: 25, marginRight: 10 }}
            source={{ uri: "https://i.imgur.com/xIbrICe.png" }}
          />
          <Timer time={time} />
          <Pressable>
            <Image
              style={{ width: 30, height: 30, marginLeft: 10 }}
              source={{ uri: "https://i.imgur.com/84nbgIQ.png" }}
            />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: 300,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <Image
            style={{ width: 7, height: 60 }}
            source={{ uri: "https://i.imgur.com/2ZSxLdZ.png" }}
          />
          <Text style={styles.directions}>
            Use the control buttons to build a list of commands for Chillah. Get
            to the flower field to complete the challenge!
          </Text>
        </View>
      </View>

      {/* Background Gradient */}
      <Image
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.9,
          zIndex: -1,
        }}
        source={{ uri: "https://i.imgur.com/X8Jcxlu.png" }}
      />

      {/* Game Canvas */}
      <View style={styles.canvas}>
        <Image
          style={styles.img}
          source={{
            uri: "https://i.ibb.co/c2hJGzR/sample-path.png",
          }}
        />
        <Image style={spriteStyle} source={spriteSource} />
        <Image style={arrowStyle} source={arrowSource} />
        <Image
          style={boulderStyle}
          source={{
            uri: "https://i.ibb.co/8K7wCmK/boulder.png",
          }}
        />
        <ScrollView style={styles.commandDisplay}>
          <Text style={styles.commandTitle}>Commands</Text>
          {printableCommandList.map((element, index) => {
            return (
              <Text style={styles.commandListItems} key={index}>
                {element}
              </Text>
            );
          })}
        </ScrollView>
        <Pressable
          style={playStyle}
          onPress={() => {
            executeCommands();
          }}
          onPressIn={() => setPlayStyle({ ...playStyle, opacity: 0.5 })}
          onPressOut={() => setPlayStyle({ ...playStyle, opacity: 1 })}
        >
          <Image
            source={{ uri: "https://i.ibb.co/Kzt5W6F/play-button.png" }}
            style={styles.startButton}
          />
        </Pressable>
      </View>

      {/* Command Buttons */}
      <View style={styles.commandButtonContainer}>
        <View style={{ gap: 12 }}>
          <Pressable
            style={forwardStyle}
            onPress={() => {
              setPrintableCommandList([...printableCommandList, "Forward"]);
            }}
            onPressIn={() => setForwardStyle({ opacity: 0.5 })}
            onPressOut={() => setForwardStyle({ opacity: 1 })}
          >
            <View>
              <Image
                source={{
                  uri: "https://i.ibb.co/j3z20D8/control-button.png",
                }}
                style={styles.controlButton}
              />
              <Text style={{ ...styles.controlButtonText, left: "18%" }}>
                Forward
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={leftStyle}
            onPress={() => {
              setPrintableCommandList([...printableCommandList, "Turn Left"]);
            }}
            onPressIn={() => setLeftStyle({ opacity: 0.5 })}
            onPressOut={() => setLeftStyle({ opacity: 1 })}
          >
            <View>
              <Image
                source={{ uri: "https://i.ibb.co/j3z20D8/control-button.png" }}
                style={styles.controlButton}
              />
              <Text style={{ ...styles.controlButtonText, left: "12%" }}>
                Turn Left
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={{ gap: 12 }}>
          <Pressable
            style={rightStyle}
            onPress={() => {
              setPrintableCommandList([...printableCommandList, "Turn Right"]);
            }}
            onPressIn={() => setRightStyle({ opacity: 0.5 })}
            onPressOut={() => setRightStyle({ opacity: 1 })}
          >
            <View>
              <Image
                source={{ uri: "https://i.ibb.co/j3z20D8/control-button.png" }}
                style={styles.controlButton}
              />
              <Text style={{ ...styles.controlButtonText, left: "8%" }}>
                Turn Right
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={boomStyle}
            onPress={() => {
              setPrintableCommandList([...printableCommandList, "BOOM!"]);
            }}
            onPressIn={() => setBoomStyle({ opacity: 0.5 })}
            onPressOut={() => setBoomStyle({ opacity: 1 })}
          >
            <View>
              <Image
                source={{ uri: "https://i.ibb.co/j3z20D8/control-button.png" }}
                style={styles.controlButton}
              />
              <Text style={{ ...styles.controlButtonText, left: "29%" }}>
                BOOM!
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Footer */}
      <Image
        source={{ uri: "https://i.imgur.com/2ztxWLR.png" }}
        style={{
          position: "absolute",
          top: "85%",
          width: "100%",
          height: "15%",
        }}
      />

      {gameComplete && (
        <LottieView
          source={require("../../assets/Animation - 1723118019312.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#151716",
  },
  canvas: {
    position: "relative",
    width: 375,
    height: 375,
    borderRadius: 12,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  controlButton: {
    width: 165,
    height: 60,
  },
  controlButtonText: {
    fontFamily: "Silkscreen-Regular",
    textTransform: "capitalize",
    color: "white",
    textAlign: "center",
    position: "absolute",
    top: "25%",
    fontSize: 20,
  },
  textStyle: {
    fontFamily: "Avenir Next",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 12,
  },
  commandDisplay: {
    width: "30%",
    height: "61%",
    objectFit: "cover",
    position: "absolute",
    top: "5%",
    left: "65%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
  },
  commandTitle: {
    fontFamily: "Silkscreen-Regular",
    textTransform: "capitalize",
    color: "yellow",
    textAlign: "center",
    marginTop: 5,
  },
  commandButtonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    gap: 15,
  },
  startButton: {
    width: "33%",
    height: "39%",
    position: "absolute",
    top: "59%",
    left: "64%",
  },
  commandListItems: {
    fontFamily: "Silkscreen-Regular",
    textTransform: "capitalize",
    color: "white",
    textAlign: "center",
  },
  chillahChallenge: {
    color: "white",
    fontSize: 24,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    lineHeight: 31.2,
    wordWrap: "break-word",
  },
  directions: {
    width: "100%",
    color: "white",
    fontSize: 16,
    fontFamily: "Avenir Next",
    fontWeight: "500",
    lineHeight: 20,
    wordWrap: "break-word",
    marginLeft: 15,
  },
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "absolute",
    left: "50%",
    top: "58%",
  },
});
