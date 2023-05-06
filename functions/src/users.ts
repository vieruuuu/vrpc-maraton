import * as functions from "firebase-functions";

export const a = functions
  .region("europe-central2")
  .https.onRequest(async (req, res) => {
    res.send("Helo");
  });
