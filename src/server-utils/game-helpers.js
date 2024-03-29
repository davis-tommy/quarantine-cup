const firebaseAdmin = require("../pages/api/_firebase");

export const useGameByIdOrCode = async (gameId) => {
  const db = firebaseAdmin.firestore();

  let gameData;
  let error;

  try {
    try {
      const gamesDoc = await db.collection("games").doc(gameId).get();

      if (!gamesDoc.exists) {
        throw new Error("Game does not exist");
      }
      gameData = { ...gamesDoc.data(), id: gamesDoc.id };
    } catch (err) {
      if (err.message !== "Game does not exist") {
        console.log(err);
      }
      // use room code instead?
      if (err.message === "Game does not exist") {
        const gamesRef = db.collection("games");
        const myGamesRef = await gamesRef.where("roomCode", "==", gameId).get();
        const datas = myGamesRef.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        gameData = datas[0];
      }
      error = err;
    }
  } catch (err) {
    console.log("error", err);
    //actual error like 500 boss
    error = err;
  }

  return [gameData, error];
};
