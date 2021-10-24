import express from "express";
import bodyParser from "body-parser";
import generateRoutes from "@router";

//@ts-ignore
import("typeorm")
  .then(async (typeorm) => {
    await typeorm.createConnection();
    init();
  })
  .catch(() => {
    init();
  });

const init = async () => {
  const app = express();
  app.use(bodyParser.json());

  await generateRoutes(app);

  app.all("*", (req: express.Request, res: express.Response) => {
    res.status(404).json({
      statusCode: 404,
      message: `${req.path} not found`,
    });
  });

  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${process.env.PORT || 3001}`);
  });
};
