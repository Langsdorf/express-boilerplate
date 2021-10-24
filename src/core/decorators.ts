import "reflect-metadata";

interface RouteObject {
  key: string;
  path: string;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  handler: Function;
}

let routes: RouteObject[] = [];

export const getRoutesObject = (): RouteObject[] => routes;
export const clearRoutes = (): RouteObject[] => (routes = []);

const methodDecoratorFunction = (
  path: string = "/",
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
) => {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let handler = descriptor.value!;

    descriptor.value = function (...args) {
      let existingParameters: {
        parameterIndex: number;
        type: string;
      }[] = Reflect.getOwnMetadata(propertyKey, target, propertyKey) || [];

      existingParameters = existingParameters.sort(
        (a, b) => a.parameterIndex - b.parameterIndex
      );

      const newArgs = [];

      if (existingParameters) {
        for (let { type } of existingParameters) {
          for (let { parameter, type: realParameterType } of args) {
            if (realParameterType !== type) continue;
            newArgs.push(parameter);
          }
        }
      }

      return handler.apply(this, newArgs);
    };

    const formatPath = path.indexOf("/") === 0 ? path : `/${path}`;

    routes.push({
      key: propertyKey,
      path: `${path ? formatPath : "/"}`,
      method,
      handler: descriptor.value,
    });

    return descriptor;
  };
};

const paramDecoratorFunction = (type: string) => {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    let existingParameters: {
      parameterIndex: number;
      type: string;
    }[] = Reflect.getOwnMetadata(propertyKey, target, propertyKey) || [];

    existingParameters.push({
      parameterIndex,
      type,
    });

    Reflect.defineMetadata(
      propertyKey,
      existingParameters,
      target,
      propertyKey
    );
  };
};

export const GET = (path: string = "/") => methodDecoratorFunction(path, "GET");
export const POST = (path: string = "/") =>
  methodDecoratorFunction(path, "POST");
export const DELETE = (path: string = "/") =>
  methodDecoratorFunction(path, "DELETE");
export const PUT = (path: string = "/") => methodDecoratorFunction(path, "PUT");
export const PATCH = (path: string = "/") =>
  methodDecoratorFunction(path, "PATCH");

export const Body = () => paramDecoratorFunction("body");
export const Request = () => paramDecoratorFunction("request");
export const Response = () => paramDecoratorFunction("response");
export const Next = () => paramDecoratorFunction("next");
