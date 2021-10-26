# An Express and TypeORM with MongoDB or MySQL boilerplate

## Quick Start

To create a project:

```bash
npx ebp-cli new <project-name>
```

Then

```bash
cd <project-name>
npm run start
```

## Environment Variables

```bash
# Port number
PORT=3001
```

## Project Structure

```
src\
 |--core\           # Core files
 |--modules\        # Modules files (controllers, services, entities, migrations...)
 |--index.js        # App entry point
```

## Modules

The modules sounds like [NestJS modules](https://docs.nestjs.com/modules). To create a module:

Create a new folder inside modules directory:

```
    src\
     |--core\           # Core files
     |--modules\        # Modules files (controllers, services, entities, migrations...)
     |----new_module\   # New folder inside modules directory
     |--index.js        # App entry point
```

Create controller and service files inside your new folder:

```
    src\
     |--core\           # Core files
     |--modules\        # Modules files (controllers, services, entities, migrations...)
     |----new_module\   # New folder inside modules directory
     |------new_module.controller.ts
     |------new_module.service.ts
     |--index.js        # App entry point
```

### Follow the [existing examples](https://github.com/Langsdorf/express-boilerplate/tree/master/src/modules) for more information

## Decorators

The list of available decorators can be found in the [decorators file](https://github.com/Langsdorf/express-boilerplate/blob/master/src/core/decorators.ts)

## Code example from [status.controller.ts](https://github.com/Langsdorf/express-boilerplate/blob/master/src/modules/status/status.controller.ts)
```ts
import { GET, Response } from "@decorators";
import express from "express";
import StatusService from "./status.service";

export default class UserController {
  constructor(
    private readonly statusService: StatusService = new StatusService()
  ) {}

  @GET() //GET method, default path = /
  public async getStatus(@Response() res: express.Response) {
    res.send(await this.statusService.getStatus());
  }
}
```
