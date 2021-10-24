import { GET, Response } from "@decorators";
import express from "express";
import StatusService from "./status.service";

export default class UserController {
  constructor(
    private readonly statusService: StatusService = new StatusService()
  ) {}

  @GET()
  public async getStatus(@Response() res: express.Response) {
    res.send(await this.statusService.getStatus());
  }
}
