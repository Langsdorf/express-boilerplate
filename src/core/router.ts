import { log } from "./logging";
import chalk from "chalk";
import { Application, Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { clearRoutes, getRoutesObject } from "./decorators";

const throughDirectory = (dir: string, files: string[]) => {
  fs.readdirSync(dir).forEach((file) => {
    const absolute = path.join(dir, file);
    if (fs.statSync(absolute).isDirectory())
      return throughDirectory(absolute, files);
    else return files.push(absolute);
  });
};

const generateRoutes = (app: Application) => {
  return new Promise<void>((resolve) => {
    const modules: string[] = [];
    log("Generating routes...");

    const modulesPath = path.join(__dirname, "../modules");

    if (!fs.existsSync(modulesPath)) {
      log("Modules path not found", "red");
      return resolve();
    }

    fs.readdirSync(modulesPath).forEach((file) => {
      const absolute = path.join(modulesPath, file);
      if (fs.statSync(absolute).isDirectory()) modules.push(file);
    });

    log(
      `${chalk.yellow(modules.length)} modules found in ${chalk.yellow(
        "src/modules"
      )}, starting routes...`
    );

    modules.forEach((module, index) => {
      const controllerPath = path.join(
        modulesPath,
        module,
        `${module}.controller.ts`
      );

      const servicePath = path.join(
        modulesPath,
        module,
        `${module}.service.ts`
      );

      if (fs.existsSync(controllerPath) && fs.existsSync(servicePath)) {
        log(
          `Loading routes from ${chalk.yellow(
            module + controllerPath.slice(controllerPath.lastIndexOf("\\"))
          )}...`
        );

        const Controller = require(controllerPath).default;
        const ControllerClass = new Controller();

        const routes = getRoutesObject();

        routes.forEach((route) => {
          const { method, path, handler } = route;

          app[method.toLowerCase()](
            `/${module + path}`,
            (request: Request, response: Response, next: Function) => {
              handler.apply(ControllerClass, [
                { type: "request", parameter: request },
                { type: "response", parameter: response },
                { type: "next", parameter: next },
                { type: "body", parameter: request.body },
              ]);
            }
          );

          log(
            `${chalk.blue(route.method)} ${chalk.magenta(module + route.path)}`
          );
        });

        log(
          `${chalk.yellow(routes.length)} route${
            routes.length > 1 ? "s" : ""
          } loaded from ${chalk.yellow(
            module + controllerPath.slice(controllerPath.lastIndexOf("\\"))
          )}`
        );

        clearRoutes();
      }
      if (index === modules.length - 1) resolve();
    });
  });
};

export default generateRoutes;
